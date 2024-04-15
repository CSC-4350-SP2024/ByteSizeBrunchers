#!/bin/bash
nix-shell -v -E 'import (builtins.fetchurl "https://raw.githubusercontent.com/toraritte/shell.nixes/main/elixir-phoenix-postgres/shell.nix")'
createdb $(whoami) --host=$PGDATA
psql --host=localhost --username=$(whoami) --dbname=$(whoami) --port=5432
