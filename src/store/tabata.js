export default {
    state: {
        tabatas: [
            {
                name: 'Default Workout',
                settings: {
                    prepare: {
                        name: "Prepare",
                        value: 10,
                        valueBeforeChange: 10
                    },
                    work: {
                        name: "Work",
                        value: 20,
                        valueBeforeChange: 20
                    },
                    rest: {
                        name: "Rest",
                        value: 10,
                        valueBeforeChange: 10
                    },
                    cycles: {
                        name: "Cycles",
                        value: 8,
                        valueBeforeChange: 8
                    },
                    sets: {
                        name: "Sets",
                        value: 1,
                        valueBeforeChange: 1
                    }
                }
            }
        ],
        selectedTabata: {
            name: 'Default Workout',
            settings: {
                prepare: {
                    name: "Prepare",
                    value: 10,
                    valueBeforeChange: 10
                },
                work: {
                    name: "Work",
                    value: 20,
                    valueBeforeChange: 20
                },
                rest: {
                    name: "Rest",
                    value: 10,
                    valueBeforeChange: 10
                },
                cycles: {
                    name: "Cycles",
                    value: 8,
                    valueBeforeChange: 8
                },
                sets: {
                    name: "Sets",
                    value: 1,
                    valueBeforeChange: 1
                }
            }
        },
    },
    getters: {
        intervals: state => state.selectedTabata.settings.cycles.value * 2,
        duration: state => {
            const prepare = state.selectedTabata.settings.prepare.value;
            const work = state.selectedTabata.settings.work.value;
            const rest = state.selectedTabata.settings.rest.value;
            const cycles = state.selectedTabata.settings.cycles.value;
            const sets = state.selectedTabata.settings.sets.value;

            const totalSeconds = (prepare + (work * cycles) + (rest * (cycles - 1))) * sets;

            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds - (minutes * 60);

            const formattedMinutes = minutes <= 9 ? `0${minutes}` : minutes.toString();
            const formattedSeconds = seconds <= 9 ? `0${seconds}` : seconds.toString();

            return `${formattedMinutes}:${formattedSeconds}`;
        },
        saveEnabled: state => {
            let saveEnabled = false;
            Object.keys(state.selectedTabata.settings).forEach(key => {
                if (state.selectedTabata.settings[key].value != state.selectedTabata.settings[key].valueBeforeChange) {
                    saveEnabled = true;
                }
            })
            return saveEnabled;
        },
        intervalList: state => {
            const intervalList = [];
            const prepare = state.selectedTabata.settings.prepare;
            const work = state.selectedTabata.settings.work;
            const rest = state.selectedTabata.settings.rest;
            const cycles = state.selectedTabata.settings.cycles.value;

            intervalList.push({
                name: prepare.name,
                value: prepare.value,
                icon: 'icon-prepare'
            })

            for (let i = 0; i < (cycles * 2) - 1; i++) {
                if (i % 2 == 0) {
                    intervalList.push({
                        name: work.name,
                        value: work.value,
                        icon: 'icon-workout'
                    })
                } else {
                    intervalList.push({
                        name: rest.name,
                        value: rest.value,
                        icon: 'icon-rest'
                    })
                }
            }

            return intervalList;
        }
    },
    mutations: {
        increment(state, key) {
            state.selectedTabata.settings[key].value++;
        },
        decrement(state, key) {
            state.selectedTabata.settings[key].value--;
        }
    },
    actions: {
        increment({ commit }, key) {
            commit('increment', key);
        },
        decrement({ commit }, key) {
            commit('decrement', key);
        }
    }
}