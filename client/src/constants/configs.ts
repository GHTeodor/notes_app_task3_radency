const baseURL = "http://localhost:5200";

const notes = '/notes';

const urls = {
    notes: {
        notes,
        byId: (id: number): string => `${notes}/${id}`,
        archiveById: (id: number): string => `${notes}/archive/${id}`,
        unarchiveById: (id: number): string => `${notes}/unarchive/${id}`,
        statistics: `${notes}/stats`,
        archived: `${notes}/archived`,
    }
};

export {
    baseURL,
    urls,
};