const getPublicProducts = async (cursor: number | null, limit: number = 20) => {
  try {
    const res = await fetch(`/api/public?cursor=${cursor}&limit=${limit}`);

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

export { getPublicProducts };
