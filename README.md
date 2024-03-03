# ByteSizeBrunchers
SP2024 Software Engineering Group project

# Le Stack

```
Nix for sane node version management
NodeJS as backend runtime
NextJS as frontend
```


# Build guide

Install [nix](https://nixos.org/download#nix-install-linux), the package manager. On Debian-based systems, do
```
curl -L https://nixos.org/nix/install | sh
```

Run nix-shell in the root directory to install node and everything else
```
nix-shell
```

To build, cd into the flavorfeed directory and run
```
npm build dev
```

