# # Autobattle

This project was meant to be a case study for the classic auto battle games. The player raid dungeons with their parties for loot.

# Framework

This project was initialized with Ionic v6.

# How does it work?

Well, each combatant is assigned with a cool down (`recovery`) based on his stats. Each elapsing milliseconds are added to `rested` counter, when `rested` reached `recovery` he can do one action.

For now, the only action is to attack the weakest member of the opposing faction. "Weakness" is determined based on remaining health.

When `life` hits zero, a combatant is considered dead.

When all combatants of any faction are dead, then the other faction win and game over.

# TODO

- [ ] Download monsters schema & missions schema from a remote server
  - [ ] Server?
    - [ ] Github.io
  - [ ] New monster images?
    - [ ] Download and store locally?
- [x] Save & Load game
- [x] Level up
- [ ] Equipments
- [x] Vendors
- [ ] Missions zones
- [x] Missions level requirements
- [x] Missions repeatable
- [x] Single party
