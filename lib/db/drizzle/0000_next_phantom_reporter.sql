-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "event_categories" (
	"category_id" serial PRIMARY KEY NOT NULL,
	"category_name" varchar(100) NOT NULL,
	"head_coordinator_name" varchar(150),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "event_categories_category_name_key" UNIQUE("category_name")
);
--> statement-breakpoint
CREATE TABLE "colleges" (
	"college_id" serial PRIMARY KEY NOT NULL,
	"college_name" varchar(200) NOT NULL,
	"university_name" varchar(200),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "colleges_college_name_key" UNIQUE("college_name")
);
--> statement-breakpoint
CREATE TABLE "participants" (
	"participant_id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar(150) NOT NULL,
	"gender" varchar(20),
	"dob" date,
	"email" varchar(150) NOT NULL,
	"mobile_number" varchar(20),
	"college_id" integer,
	"course" varchar(100),
	"year_of_study" integer,
	"city" varchar(100),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "participants_email_key" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "events" (
	"event_id" serial PRIMARY KEY NOT NULL,
	"event_name" varchar(200) NOT NULL,
	"fest_name" varchar(150) NOT NULL,
	"category_id" integer,
	"venue_id" integer,
	"event_date" date,
	"registration_fee" numeric(10, 2) DEFAULT '0.00',
	"is_competition" boolean DEFAULT false,
	"faculty_coordinator_name" varchar(150),
	"student_coordinator_name" varchar(150),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "venues" (
	"venue_id" serial PRIMARY KEY NOT NULL,
	"venue_name" varchar(150) NOT NULL,
	"max_capacity" integer,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "venues_venue_name_key" UNIQUE("venue_name")
);
--> statement-breakpoint
CREATE TABLE "registrations" (
	"registration_id" serial PRIMARY KEY NOT NULL,
	"registration_code" varchar(50),
	"participant_id" integer,
	"event_id" integer,
	"payment_status" varchar(50) DEFAULT 'Pending',
	"transaction_id" varchar(100),
	"amount_paid" numeric(10, 2) DEFAULT '0.00',
	"registration_source" varchar(50),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "registrations_registration_code_key" UNIQUE("registration_code"),
	CONSTRAINT "registrations_participant_id_event_id_key" UNIQUE("participant_id","event_id")
);
--> statement-breakpoint
CREATE TABLE "results" (
	"result_id" serial PRIMARY KEY NOT NULL,
	"position" varchar(50),
	"total_score" integer,
	"status" varchar(50),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"event_id" integer,
	"college_id" integer
);
--> statement-breakpoint
ALTER TABLE "participants" ADD CONSTRAINT "participants_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "public"."colleges"("college_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."event_categories"("category_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("venue_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "public"."participants"("participant_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("event_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "results" ADD CONSTRAINT "results_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("event_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "results" ADD CONSTRAINT "results_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "public"."colleges"("college_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_participants_college" ON "participants" USING btree ("college_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_events_category" ON "events" USING btree ("category_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_registrations_event" ON "registrations" USING btree ("event_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_registrations_participant" ON "registrations" USING btree ("participant_id" int4_ops);--> statement-breakpoint
CREATE VIEW "public"."vw_college_participation_stats" AS (SELECT c.college_name, ec.category_name, count(DISTINCT r.participant_id) AS unique_participants, count(r.registration_id) AS total_registrations FROM colleges c JOIN participants p ON c.college_id = p.college_id JOIN registrations r ON p.participant_id = r.participant_id JOIN events e ON r.event_id = e.event_id JOIN event_categories ec ON e.category_id = ec.category_id GROUP BY c.college_name, ec.category_name);
*/