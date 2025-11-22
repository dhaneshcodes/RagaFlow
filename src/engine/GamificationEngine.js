import { writable } from 'svelte/store';

export const userLevel = writable(1);
export const karmaPoints = writable(0);
export const streakDays = writable(0);
export const showLevelUp = writable(false);
export const showDakshina = writable(false);

export class GamificationEngine {
    constructor() {
        this.levels = [
            { level: 1, name: 'Seeker', xp: 0 },
            { level: 2, name: 'Initiate', xp: 100 },
            { level: 3, name: 'Adept', xp: 300 },
            { level: 4, name: 'Monk', xp: 600 },
            { level: 5, name: 'Guru', xp: 1000 },
            { level: 6, name: 'Sage', xp: 2000 },
            { level: 7, name: 'Enlightened', xp: 5000 }
        ];

        this.loadProgress();
    }

    loadProgress() {
        const saved = localStorage.getItem('raga_gamification');
        if (saved) {
            const data = JSON.parse(saved);
            userLevel.set(data.level || 1);
            karmaPoints.set(data.xp || 0);
            streakDays.set(data.streak || 0);
            this.checkStreak(data.lastLogin);
        } else {
            // New user
            streakDays.set(1);
            this.saveProgress();
        }
    }

    saveProgress() {
        let currentLevel, currentXp, currentStreak;
        userLevel.subscribe(v => currentLevel = v)();
        karmaPoints.subscribe(v => currentXp = v)();
        streakDays.subscribe(v => currentStreak = v)();

        localStorage.setItem('raga_gamification', JSON.stringify({
            level: currentLevel,
            xp: currentXp,
            streak: currentStreak,
            lastLogin: new Date().toDateString()
        }));
    }

    checkStreak(lastLoginDate) {
        if (!lastLoginDate) return;

        const today = new Date().toDateString();
        const last = new Date(lastLoginDate);
        const diffTime = Math.abs(new Date(today) - last);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (today === lastLoginDate) {
            // Already logged in today, do nothing
        } else if (diffDays === 1) {
            // Consecutive day
            streakDays.update(n => n + 1);
        } else {
            // Streak broken
            streakDays.set(1);
        }
        this.saveProgress();
    }

    awardXP(amount) {
        karmaPoints.update(xp => {
            const newXp = xp + amount;
            this.checkLevelUp(newXp);
            return newXp;
        });
        this.saveProgress();
    }

    checkLevelUp(xp) {
        let currentLvl;
        userLevel.subscribe(v => currentLvl = v)();

        const nextLevel = this.levels.find(l => l.level === currentLvl + 1);

        if (nextLevel && xp >= nextLevel.xp) {
            userLevel.set(nextLevel.level);
            showLevelUp.set(true);
            // Play sound or trigger effect here if needed
        }
    }

    getLevelName(level) {
        return this.levels.find(l => l.level === level)?.name || 'Unknown';
    }

    getNextLevelXp(level) {
        const next = this.levels.find(l => l.level === level + 1);
        return next ? next.xp : 'Max';
    }
}

export const gamificationEngine = new GamificationEngine();
