#!/usr/bin/env bash

# ===========================================================
# NEW ADDED FOR CURRENT PROJECT
# ===========================================================
# from: https://gist.github.com/RobRuana/7cda375014e0f699fba1
# ===========================================================

# Save this file in /usr/local/bin and chmod a+x for easy access

# Execute gohere to switch $GOPATH to current directory
# Type exit to switch back

# Example usage:
# $ echo $GOPATH
#
# $ gohere
# (go@directory) $ echo $GOPATH
# /path/to/directory
# (go@directory) $ exit
# exit
# $ echo $GOPATH
#
# $

# ===========================================================
# NEW ADDED FOR CURRENT PROJECT
# ===========================================================
BASEDIR=$(dirname "$0")
cd ${BASEDIR}/../ # go to the root dir of diadust project
cd golang # then go to golang dir
# ===========================================================

# Set $GOPATH to current directory
export GOPATH=${PWD}

# ===========================================================
# NEW ADDED FOR CURRENT PROJECT
# ===========================================================
cd ./src/diadust # go to project dir
# ===========================================================

# Update command prompt to remind you which workspace you're using.
# This requires that your .bashrc looks for the $PROMPT_PREFIX variable
# export PROMPT_PREFIX="(go@`basename ${PWD}`)"

# Start a new bash shell to inherit $GOPATH
bash