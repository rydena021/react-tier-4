CREATE TABLE "person" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "first_name" VARCHAR (240),
    "last_name" VARCHAR (240),
    "email" VARCHAR (240),
    "avatar_url" VARCHAR (1000),
    "notifications" BOOLEAN DEFAULT TRUE,
    "application_goal" INTEGER DEFAULT 10,
    "commit_goal" INTEGER DEFAULT 5,
    "meetup_goal" INTEGER DEFAULT 1
);
