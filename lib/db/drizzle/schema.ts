import { pgTable, unique, serial, varchar, timestamp, index, foreignKey, date, integer, numeric, boolean, pgView, bigint } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const eventCategories = pgTable("event_categories", {
	categoryId: serial("category_id").primaryKey().notNull(),
	categoryName: varchar("category_name", { length: 100 }).notNull(),
	headCoordinatorName: varchar("head_coordinator_name", { length: 150 }),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	unique("event_categories_category_name_key").on(table.categoryName),
]);

export const colleges = pgTable("colleges", {
	collegeId: serial("college_id").primaryKey().notNull(),
	collegeName: varchar("college_name", { length: 200 }).notNull(),
	universityName: varchar("university_name", { length: 200 }),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	unique("colleges_college_name_key").on(table.collegeName),
]);

export const participants = pgTable("participants", {
	participantId: serial("participant_id").primaryKey().notNull(),
	fullName: varchar("full_name", { length: 150 }).notNull(),
	gender: varchar({ length: 20 }),
	dob: date(),
	email: varchar({ length: 150 }).notNull(),
	mobileNumber: varchar("mobile_number", { length: 20 }),
	collegeId: integer("college_id"),
	course: varchar({ length: 100 }),
	yearOfStudy: integer("year_of_study"),
	city: varchar({ length: 100 }),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	index("idx_participants_college").using("btree", table.collegeId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.collegeId],
			foreignColumns: [colleges.collegeId],
			name: "participants_college_id_fkey"
		}),
	unique("participants_email_key").on(table.email),
]);

export const venues = pgTable("venues", {
	venueId: serial("venue_id").primaryKey().notNull(),
	venueName: varchar("venue_name", { length: 150 }).notNull(),
	maxCapacity: integer("max_capacity"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	unique("venues_venue_name_key").on(table.venueName),
]);

export const registrations = pgTable("registrations", {
	registrationId: serial("registration_id").primaryKey().notNull(),
	registrationCode: varchar("registration_code", { length: 50 }),
	participantId: integer("participant_id"),
	eventId: integer("event_id"),
	paymentStatus: varchar("payment_status", { length: 50 }).default('Pending'),
	transactionId: varchar("transaction_id", { length: 100 }),
	amountPaid: numeric("amount_paid", { precision: 10, scale:  2 }).default('0.00'),
	registrationSource: varchar("registration_source", { length: 50 }),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	index("idx_registrations_event").using("btree", table.eventId.asc().nullsLast().op("int4_ops")),
	index("idx_registrations_participant").using("btree", table.participantId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.participantId],
			foreignColumns: [participants.participantId],
			name: "registrations_participant_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.eventId],
			foreignColumns: [events.eventId],
			name: "registrations_event_id_fkey"
		}).onDelete("cascade"),
	unique("registrations_registration_code_key").on(table.registrationCode),
	unique("registrations_participant_id_event_id_key").on(table.participantId, table.eventId),
]);

export const results = pgTable("results", {
	resultId: serial("result_id").primaryKey().notNull(),
	position: varchar({ length: 50 }),
	totalScore: integer("total_score"),
	status: varchar({ length: 50 }),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	eventId: integer("event_id"),
	collegeId: integer("college_id"),
}, (table) => [
	foreignKey({
			columns: [table.eventId],
			foreignColumns: [events.eventId],
			name: "results_event_id_fkey"
		}),
	foreignKey({
			columns: [table.collegeId],
			foreignColumns: [colleges.collegeId],
			name: "results_college_id_fkey"
		}),
]);

export const events = pgTable("events", {
	eventId: serial("event_id").primaryKey().notNull(),
	eventName: varchar("event_name", { length: 200 }).notNull(),
	festName: varchar("fest_name", { length: 150 }).notNull(),
	categoryId: integer("category_id"),
	venueId: integer("venue_id"),
	eventDate: date("event_date"),
	registrationFee: numeric("registration_fee", { precision: 10, scale:  2 }).default('0.00'),
	isCompetition: boolean("is_competition").default(false),
	facultyCoordinatorName: varchar("faculty_coordinator_name", { length: 150 }),
	studentCoordinatorName: varchar("student_coordinator_name", { length: 150 }),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	status: varchar({ length: 50 }).default('Approved'),
}, (table) => [
	index("idx_events_category").using("btree", table.categoryId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [eventCategories.categoryId],
			name: "events_category_id_fkey"
		}),
	foreignKey({
			columns: [table.venueId],
			foreignColumns: [venues.venueId],
			name: "events_venue_id_fkey"
		}),
]);
export const vwCollegeParticipationStats = pgView("vw_college_participation_stats", {	collegeName: varchar("college_name", { length: 200 }),
	categoryName: varchar("category_name", { length: 100 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	uniqueParticipants: bigint("unique_participants", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	totalRegistrations: bigint("total_registrations", { mode: "number" }),
}).as(sql`SELECT c.college_name, ec.category_name, count(DISTINCT r.participant_id) AS unique_participants, count(r.registration_id) AS total_registrations FROM colleges c JOIN participants p ON c.college_id = p.college_id JOIN registrations r ON p.participant_id = r.participant_id JOIN events e ON r.event_id = e.event_id JOIN event_categories ec ON e.category_id = ec.category_id GROUP BY c.college_name, ec.category_name`);