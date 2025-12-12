const getProducts = async (cursor: number | null, limit: number = 20) => {
  try {
    const res = await fetch(`/api/products?cursor=${cursor}&limit=${limit}`, {
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
