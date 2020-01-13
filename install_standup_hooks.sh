# Usage sh ./install_standup_hooks path/to/git/repo

source_path="$(pwd)/commit-msg"

main() {
  local dest_path=$1/.git/hooks/commit-msg
  cp $source_path $dest_path
  chmod +x $dest_path
  echo "Successfully installed inside $dest_path"
}

main "$@"
