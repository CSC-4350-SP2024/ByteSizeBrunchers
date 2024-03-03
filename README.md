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

Then navigate to the app directory
```
cd flavorfeed
```

If it's your first time, run
```
npm install
```

To build, run
```
npm run dev
```

# Hosting

Do all the same as above, but now also install and use ngrok in a different terminal
```
export NIXPKGS_ALLOW_UNFREE=1
nix-shell -p ngrok
ngrok config add-authtoken {token} 
ngrok http http://localhost:3000
```