import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as fc from 'fast-check';
import { EmailItem } from '../components/EmailList';

// Arbitrary for generating valid email objects
const emailArbitrary = fc.record({
    id: fc.uuid(),
    sender: fc.record({
        name: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
        email: fc.emailAddress(),
        avatar: fc.option(fc.webUrl(), { nil: null })
    }),
    recipients: fc.array(fc.emailAddress(), { minLength: 1, maxLength: 5 }),
    subject: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
    body: fc.string({ minLength: 1, maxLength: 1000 }),
    preview: fc.string({ minLength: 1, maxLength: 200 }).filter(s => s.trim().length > 0),
    timestamp: fc.date({ min: new Date('2020-01-01'), max: new Date() }),
    isRead: fc.boolean(),
    isFlagged: fc.boolean(),
    hasAttachment: fc.boolean()
});

describe('Email App Property Tests', () => {
    /**
     * Feature: windows-phone-daily-apps, Property 1: Email List Rendering Completeness
     * Validates: Requirements 1.2
     * 
     * For any email object with sender, subject, preview, and timestamp fields,
     * the rendered email list item SHALL contain all of these fields in the output.
     */
    it('Property 1: Email list item renders all required fields (sender, subject, preview, timestamp)', () => {
        fc.assert(
            fc.property(emailArbitrary, (email) => {
                const { container } = render(
                    <EmailItem email={email} onClick={() => {}} />
                );

                // Check sender name is rendered
                const senderElement = container.querySelector('.email-sender');
                expect(senderElement).toBeInTheDocument();
                expect(senderElement.textContent).toBe(email.sender.name);

                // Check subject is rendered
                const subjectElement = container.querySelector('.email-subject');
                expect(subjectElement).toBeInTheDocument();
                expect(subjectElement.textContent).toBe(email.subject);

                // Check preview is rendered
                const previewElement = container.querySelector('.email-preview');
                expect(previewElement).toBeInTheDocument();
                expect(previewElement.textContent).toBe(email.preview);

                // Check timestamp is rendered (formatted)
                const timeElement = container.querySelector('.email-time');
                expect(timeElement).toBeInTheDocument();
                expect(timeElement.textContent.length).toBeGreaterThan(0);

                // Cleanup for next iteration
                container.remove();
            }),
            { numRuns: 100 }
        );
    });
});


import { getUnreadCount } from '../data';

// Arbitrary for generating arrays of emails with controlled read status
const emailWithReadStatusArbitrary = fc.record({
    id: fc.uuid(),
    sender: fc.record({
        name: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
        email: fc.emailAddress(),
        avatar: fc.option(fc.webUrl(), { nil: null })
    }),
    recipients: fc.array(fc.emailAddress(), { minLength: 1, maxLength: 5 }),
    subject: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
    body: fc.string({ minLength: 1, maxLength: 1000 }),
    preview: fc.string({ minLength: 1, maxLength: 200 }).filter(s => s.trim().length > 0),
    timestamp: fc.date({ min: new Date('2020-01-01'), max: new Date() }),
    isRead: fc.boolean(),
    isFlagged: fc.boolean(),
    hasAttachment: fc.boolean()
});

describe('Email Unread Count Property Tests', () => {
    /**
     * Feature: windows-phone-daily-apps, Property 2: Unread Email Count Accuracy
     * Validates: Requirements 1.5
     * 
     * For any collection of emails, the unread count displayed on the Live Tile
     * SHALL equal the count of emails where `isRead` is `false`.
     */
    it('Property 2: Unread count equals the number of emails where isRead is false', () => {
        fc.assert(
            fc.property(
                fc.array(emailWithReadStatusArbitrary, { minLength: 0, maxLength: 50 }),
                (emails) => {
                    // Calculate expected unread count manually
                    const expectedUnreadCount = emails.filter(email => !email.isRead).length;
                    
                    // Get unread count from the function
                    const actualUnreadCount = getUnreadCount(emails);
                    
                    // They should be equal
                    expect(actualUnreadCount).toBe(expectedUnreadCount);
                }
            ),
            { numRuns: 100 }
        );
    });
});
