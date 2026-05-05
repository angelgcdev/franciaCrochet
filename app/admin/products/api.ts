const getProducts = async (
  cursor: number | null,
  limit: number = 20,
  search: string | null = null
) => {
  try {
    const params = new URLSearchParams();
    if (cursor) params.set("cursor", String(cursor));
    if (limit) params.set("limit", String(limit));
    if (search) params.set("search", search);

    const res = await fetch(`/api/products?${params.toString()}`, {
      credentials: "include",
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    const data = await res.json();

    return {
      ok: true,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
};

export { getProducts };
