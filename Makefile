SHELL=/bin/bash

RED     := \033[0;31m
GREEN   := \033[0;32m
BLUE    := \033[0;34m
RESET   := \033[0m

INFO := [${GREEN}INFO${RESET}]:

cli:
	@printf "${INFO} up container...\n" \
	&& docker-compose up

build:
	@printf "${INFO} build and up containers...\n" \
	&& docker-compose up --build

app:
	@printf "${INFO} run app container...\n" \
	&& docker-compose up -d app --build

database:
	@printf "${INFO} run database container...\n" \
	&& docker-compose up -d postgres_express_api --build

down:
	@printf "${INFO} down all containers...\n" \
	&& docker-compose down --remove-orphans

prisma-generate:
	@printf "${INFO} push database changes...\n" \
	&& npx dotenv -e .env.development -- prisma db push
