#!/bin/bash

github_token=$(cat /run/secrets/github_token 2> /dev/null)
org_repository=$(cat /run/secrets/org_repository 2> /dev/null)

if [[ -z "$runner_labels" ]]; then
	runner_labels="v1"
fi

source /usr/local/bin/github-api.sh

if [[ -z "$org_repository" ]]; then
    echo "No org_repository provided"
    exit 1
fi

function get_runner_token () {
    if [[ ! -z "$github_token" ]]; then
        runner_token=$(
            gh-actions-token $github_token \
                             $org_repository \
                             runner_token
        )

        if [[ "$runner_token" == "null" ]]; then
            echo "Failed to get '$org_repository' runner_token, check github_token permission"
            exit 1
        fi
    else
        runner_token=$(cat /run/secrets/runner_token 2> /dev/null)

        if [[ -z "$runner_token" ]]; then
            echo "No runner_token or github_token provided"
            exit 1
        fi
    fi
}

get_runner_token

if [[ -z "$name_label" ]]; then
	name_label=$(echo $runner_token | sha3sum -a 256 | head -c4)
fi

name=$(echo $org_repository | sed 's|/|-|g')-$name_label

set -e

/home/runner/actions-runner/config.sh \
    --url https://github.com/$org_repository \
    --token $runner_token \
    --labels "$runner_labels" \
    --name $name

function cleanup () {
    get_runner_token

    /home/runner/actions-runner/config.sh remove \
        --token $runner_token
}

trap 'cleanup; exit 130' INT
trap 'cleanup; exit 143' TERM

/home/runner/actions-runner/run.sh & wait $!
