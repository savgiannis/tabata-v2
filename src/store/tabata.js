export default {
    state: {
        tabatas: [
            {
                name: 'Default Workout',
                settings: {
                    prepare: {
                        name: "Prepare",
                        value: 10
                    },
                    work: {
                        name: "Work",
                        value: 20
                    },
                    rest: {
                        name: "Rest",
                        value: 10
                    },
                    cycles: {
                        name: "Cycles",
                        value: 8
                    },
                    sets: {
                        name: "Sets",
                        value: 1
                    }
                }
            }
        ],
        selectedTabata: null,
        draftWorkout: null
    },
    getters: {
        intervals: (state, getters) => getters.intervalList.length,
        duration: state => {
            const prepare = state.selectedTabata.settings.prepare.value;
            const work = state.selectedTabata.settings.work.value;
            const rest = state.selectedTabata.settings.rest.value;
            const cycles = state.selectedTabata.settings.cycles.value;
            const sets = state.selectedTabata.settings.sets.value;

            const totalSeconds = (prepare + (work * cycles) + (rest * (cycles - 1))) * sets;

            return totalSeconds;
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

            if (prepare.value > 0) {
                intervalList.push({
                    name: prepare.name,
                    value: prepare.value,
                    icon: 'icon-prepare'
                })
            }

            for (let i = 0; i < (cycles * 2) - 1; i++) {
                if (i % 2 == 0) {
                    intervalList.push({
                        name: work.name,
                        value: work.value,
                        icon: 'icon-workout'
                    })
                } else {
                    if (rest.value) {
                        intervalList.push({
                            name: rest.name,
                            value: rest.value,
                            icon: 'icon-rest'
                        })
                    }
                }
            }

            return intervalList;
        }
    },
    mutations: {
        selectWorkout(state, isLoggedIn) {
            let selectedTabata;

            if (!isLoggedIn) {
                selectedTabata = state.tabatas.find(tabata => tabata.name === 'Default Workout');
            } else {
                selectedTabata = state.tabatas.find(tabata => tabata.name === 'Default Workout');
            }

            Object.keys(selectedTabata.settings).forEach(key => selectedTabata.settings[key].valueBeforeChange = selectedTabata.settings[key].value);

            state.selectedTabata = selectedTabata;
        },
        increment(state, key) {
            state.selectedTabata.settings[key].value++;
        },
        decrement(state, key) {
            if ((key == 'prepare' || key == 'rest') && state.selectedTabata.settings[key].value == 0) return;
            if ((key == 'work' || key == 'cycles' || key == 'sets') && state.selectedTabata.settings[key].value == 1) return;
            state.selectedTabata.settings[key].value--;
        },
        createNewWorkout(state) {
            const draftWorkout = {
                name: '',
                settings: {
                    prepare: {
                        name: "Prepare",
                        value: 10
                    },
                    work: {
                        name: "Work",
                        value: 20
                    },
                    rest: {
                        name: "Rest",
                        value: 10
                    },
                    cycles: {
                        name: "Cycles",
                        value: 8,
                    },
                    sets: {
                        name: "Sets",
                        value: 1,
                    }
                },
                makeActive: true
            }
            state.draftWorkout = draftWorkout;
        },
        cancelNewWorkout(state) {
            state.draftWorkout = null;
        }
    },
    actions: {
        selectWorkout({ commit, rootState }) {
            commit('selectWorkout', rootState.auth.isLoggedIn);
        },
        increment({ commit }, key) {
            commit('increment', key);
        },
        decrement({ commit }, key) {
            commit('decrement', key);
        },
        createNewWorkout({ commit }) {
            commit('createNewWorkout');
        },
        cancelNewWorkout({ commit }) {
            commit('cancelNewWorkout')
        },
        submitNewWorkout({ commit }, workout) {
            console.log(workout)
        }
    }
}