#!/usr/bin/env bash

declare -r none='\033[0m'
declare -r green='\033[1;32m'

main() {
  # Stops the execution of the script if there is an error
  set -e

  # ESlint is run
  npm run lint
  echo -e " ${green}✓ - ESlint passes successfully!${none}"

  # Prettier is run
  npm run prettier
  echo -e " ${green}✓ - Prettier passes successfully!${none}"

  # Tests are run
  npm run test:pre-commit
  echo -e " ${green}✓ - Tests passes successfully!${none}"
}
main
