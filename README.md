# standup
Generate status updates from your commit messages using git commit hooks

# Requirements
* NodeJS (this was tested on `v10.16.3`)

# Installation
```
$ git clone git@github.com:mudassir0909/standup.git
$ cd standup
# WARNING: IF YOU ALREADY HAVE A "commit-msg" HOOK, THIS WILL REPLACE IT
$ sh ./install_standup_hooks.sh path/to/your/git/repo
```

* _Optional_ Add the following to your `.zshrc` or `.bashrc` or `.whateverrc`

```
standup() { node ~/path/to/standup/status_update.js }
```

# Running
Run the following command

 ```
$ node ~/path/to/standup/status_update.js
OR
$ standup

**********Update for 15-Jan-2020**********

Repository: epic-repository

  Branch: mudassir/epic-branch

    👉 Made a change
    👉 Made another change
    👉 Reverted both changes


  Branch: mudassir/not-so-epic-branch

    👉 Add .gitignore
 ```

# How it works
All your commit messages are stored inside `~/.statusupdate` folder, grouped by day.

```
$ ls ~/.statusupdate
13002020 14002020 15002020
```

When you run `node ~/path/to/standup/status_update.js`, it find the recently modified file and outputs updates from it.

# Todo
– [ ] View updates by selected date
- [ ] Auto clean updates older than 30(or N) days
