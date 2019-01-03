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


CREATE TABLE "contact" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER references "person",
    "first_name" VARCHAR (240),
    "last_name" VARCHAR (240),
    "email" VARCHAR (240),
    "phone" VARCHAR (20),
    "company" VARCHAR (240),
    "linkedin_url" VARCHAR (1000),
    "comments" VARCHAR (5000),
    "date_met" DATE
);

CREATE TABLE "application" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER references "person",
    "contact_id" INTEGER references "contact" DEFAULT NULL,
    "position" VARCHAR (240),
    "company" VARCHAR (240),
    "posting_url" VARCHAR (1000),
    "date_applied" DATE,
    "comments" VARCHAR (5000),
    "follow_up_complete" BOOLEAN DEFAULT FALSE,
    "notification_sent" BOOLEAN DEFAULT FALSE
);
