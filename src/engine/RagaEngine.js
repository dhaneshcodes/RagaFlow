import ragas from '../data/ragas.json';

export class RagaEngine {
    constructor() {
        this.ragas = ragas;
    }

    recommendRaga(mood, timeOfDay) {
        // Filter by mood first
        let candidates = this.ragas.filter(r => r.mood === mood);

        // If multiple, try to match time of day
        const timeMatch = candidates.find(r => r.timeOfDay === timeOfDay);

        if (timeMatch) return timeMatch;

        // Fallback to first candidate or default
        return candidates.length > 0 ? candidates[0] : this.getDefaultRaga();
    }

    getDefaultRaga() {
        return this.ragas.find(r => r.id === 'yaman') || this.ragas[0];
    }

    getRagaById(id) {
        return this.ragas.find(r => r.id === id);
    }
}

export const ragaEngine = new RagaEngine();
