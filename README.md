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

In a different terminal, host ngrok on the port used by nextjs
```
export NIXPKGS_ALLOW_UNFREE=1
nix-shell -p ngrok
ngrok config add-authtoken {token} 
ngrok http http://localhost:3000
```

In a different terminal, host postgres locally
```
nix-shell -v -E 'import (builtins.fetchurl "https://raw.githubusercontent.com/toraritte/shell.nixes/main/elixir-phoenix-postgres/shell.nix")'
createdb $(whoami) --host=$PGDATA
psql --host=localhost --username=$(whoami) --dbname=$(whoami) --port=5432
```
