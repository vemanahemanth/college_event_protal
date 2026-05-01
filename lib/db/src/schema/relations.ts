import { relations } from "drizzle-orm/relations";
import { colleges, participants, eventCategories, events, venues, registrations, results } from "./schema";

export const participantsRelations = relations(participants, ({one, many}) => ({
	college: one(colleges, {
		fields: [participants.collegeId],
		references: [colleges.collegeId]
	}),
	registrations: many(registrations),
}));

export const collegesRelations = relations(colleges, ({many}) => ({
	participants: many(participants),
	results: many(results),
}));

export const eventsRelations = relations(events, ({one, many}) => ({
	eventCategory: one(eventCategories, {
		fields: [events.categoryId],
		references: [eventCategories.categoryId]
	}),
	venue: one(venues, {
		fields: [events.venueId],
		references: [venues.venueId]
	}),
	registrations: many(registrations),
	results: many(results),
}));

export const eventCategoriesRelations = relations(eventCategories, ({many}) => ({
	events: many(events),
}));

export const venuesRelations = relations(venues, ({many}) => ({
	events: many(events),
}));

export const registrationsRelations = relations(registrations, ({one}) => ({
	participant: one(participants, {
		fields: [registrations.participantId],
		references: [participants.participantId]
	}),
	event: one(events, {
		fields: [registrations.eventId],
		references: [events.eventId]
	}),
}));

export const resultsRelations = relations(results, ({one}) => ({
	event: one(events, {
		fields: [results.eventId],
		references: [events.eventId]
	}),
	college: one(colleges, {
		fields: [results.collegeId],
		references: [colleges.collegeId]
	}),
}));