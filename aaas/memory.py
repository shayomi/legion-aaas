"""
memory.py - Stores project content in ChromaDB so the agent can
semantically search "what does this project do" without re-reading everything.
"""

import hashlib
import math
import os
import re
from pathlib import Path

import chromadb


MEMORY_DIR = ".aaas_memory"
EMBED_DIM = int(os.getenv("AAAS_EMBED_DIM", "256"))
EMBED_BATCH_SIZE = int(os.getenv("AAAS_EMBED_BATCH_SIZE", "50"))
MEMORY_CHUNK_SIZE = int(os.getenv("AAAS_MEMORY_CHUNK_SIZE", "2000"))
TOKEN_RE = re.compile(r"[A-Za-z_][A-Za-z0-9_./:-]*")


def get_client(memory_dir: str = MEMORY_DIR) -> chromadb.PersistentClient:
    Path(memory_dir).mkdir(exist_ok=True)
    return chromadb.PersistentClient(path=memory_dir)


def _embed_text(text: str) -> list[float]:
    vector = [0.0] * EMBED_DIM
    tokens = TOKEN_RE.findall(text.lower())

    if not tokens:
        return vector

    for token in tokens:
        digest = hashlib.blake2b(token.encode("utf-8"), digest_size=16).digest()
        index = int.from_bytes(digest[:4], "big") % EMBED_DIM
        sign = 1.0 if digest[4] % 2 == 0 else -1.0
        weight = 1.0 + (digest[5] / 255.0)
        vector[index] += sign * weight

    norm = math.sqrt(sum(value * value for value in vector))
    if norm == 0:
        return vector
    return [value / norm for value in vector]


def _embed_texts(texts: list[str]) -> list[list[float]]:
    return [_embed_text(text) for text in texts]


def store_project(files: list[dict], collection_name: str = "project") -> int:
    """
    Store project files in ChromaDB.
    Each file is chunked into coarse documents. Returns number of documents stored.
    """
    client = get_client()

    try:
        client.delete_collection(collection_name)
    except Exception:
        pass

    collection = client.create_collection(name=collection_name)

    docs, ids, metas = [], [], []
    for i, file_data in enumerate(files):
        content = file_data["content"]
        chunks = [
            content[j : j + MEMORY_CHUNK_SIZE]
            for j in range(0, len(content), MEMORY_CHUNK_SIZE)
        ]
        for k, chunk in enumerate(chunks):
            docs.append(chunk)
            ids.append(f"{i}_{k}")
            metas.append({"path": file_data["path"]})

    if docs:
        for start in range(0, len(docs), EMBED_BATCH_SIZE):
            end = start + EMBED_BATCH_SIZE
            batch_docs = docs[start:end]
            collection.add(
                documents=batch_docs,
                embeddings=_embed_texts(batch_docs),
                ids=ids[start:end],
                metadatas=metas[start:end],
            )

    return len(docs)


def query(question: str, n: int = 5, collection_name: str = "project") -> list[str]:
    """
    Semantic search over the stored project.
    Returns a list of relevant text chunks.
    """
    client = get_client()

    try:
        collection = client.get_collection(name=collection_name)
    except Exception:
        return ["No memory found. Run the agent on a project first."]

    if collection.count() == 0:
        return ["No memory found. Run the agent on a project first."]

    results = collection.query(
        query_embeddings=[_embed_text(question)],
        n_results=min(n, collection.count()),
    )
    return results["documents"][0] if results["documents"] else []
