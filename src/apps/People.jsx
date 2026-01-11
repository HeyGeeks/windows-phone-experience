import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { Icon } from '../components/Icons';
import './People.css';

const CONTACTS = [
    { id: 1, name: 'Alex Johnson', phone: '+1 555-0101', email: 'alex@email.com', photo: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Beth Williams', phone: '+1 555-0102', email: 'beth@email.com', photo: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Chris Davis', phone: '+1 555-0103', email: 'chris@email.com', photo: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'Diana Miller', phone: '+1 555-0104', email: 'diana@email.com', photo: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, name: 'Eric Brown', phone: '+1 555-0105', email: 'eric@email.com', photo: 'https://i.pravatar.cc/150?img=5' },
    { id: 6, name: 'Fiona Garcia', phone: '+1 555-0106', email: 'fiona@email.com', photo: 'https://i.pravatar.cc/150?img=6' },
    { id: 7, name: 'George Martinez', phone: '+1 555-0107', email: 'george@email.com', photo: 'https://i.pravatar.cc/150?img=7' },
    { id: 8, name: 'Hannah Wilson', phone: '+1 555-0108', email: 'hannah@email.com', photo: 'https://i.pravatar.cc/150?img=8' },
    { id: 9, name: 'Ivan Taylor', phone: '+1 555-0109', email: 'ivan@email.com', photo: 'https://i.pravatar.cc/150?img=9' },
    { id: 10, name: 'Julia Anderson', phone: '+1 555-0110', email: 'julia@email.com', photo: 'https://i.pravatar.cc/150?img=10' },
];

export function People() {
    const [pivot, setPivot] = useState('all');
    const [selectedContact, setSelectedContact] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredContacts = CONTACTS.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const groupedContacts = filteredContacts.reduce((acc, contact) => {
        const letter = contact.name[0].toUpperCase();
        if (!acc[letter]) acc[letter] = [];
        acc[letter].push(contact);
        return acc;
    }, {});

    if (selectedContact) {
        return (
            <AppShell title="people" hideTitle>
                <div className="wp-contact-detail">
                    <button className="wp-back-btn" onClick={() => setSelectedContact(null)}><Icon name="back" size={20} /></button>
                    <div className="wp-contact-header">
                        <img src={selectedContact.photo} alt={selectedContact.name} className="wp-contact-photo-large" />
                        <h2 className="wp-contact-name">{selectedContact.name}</h2>
                    </div>
                    <div className="wp-contact-actions">
                        <button className="wp-contact-action"><Icon name="phone" size={24} /><span>call</span></button>
                        <button className="wp-contact-action"><Icon name="message" size={24} /><span>text</span></button>
                        <button className="wp-contact-action"><Icon name="email" size={24} /><span>email</span></button>
                    </div>
                    <div className="wp-contact-info-list">
                        <div className="wp-contact-info-item">
                            <Icon name="phone" size={20} />
                            <div className="wp-contact-info-text">
                                <span className="wp-contact-info-label">mobile</span>
                                <span className="wp-contact-info-value">{selectedContact.phone}</span>
                            </div>
                        </div>
                        <div className="wp-contact-info-item">
                            <Icon name="email" size={20} />
                            <div className="wp-contact-info-text">
                                <span className="wp-contact-info-label">email</span>
                                <span className="wp-contact-info-value">{selectedContact.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell title="people" hideTitle>
            <div className="wp-people">
                <h1 className="wp-people-title">People</h1>
                <div className="wp-pivot-header">
                    <button className={`wp-pivot ${pivot === 'all' ? 'active' : ''}`} onClick={() => setPivot('all')}>all</button>
                    <button className={`wp-pivot ${pivot === 'recent' ? 'active' : ''}`} onClick={() => setPivot('recent')}>recent</button>
                    <button className={`wp-pivot ${pivot === 'what' ? 'active' : ''}`} onClick={() => setPivot('what')}>what's new</button>
                </div>

                {pivot === 'all' && (
                    <>
                        <div className="wp-search-box">
                            <Icon name="search" size={20} />
                            <input type="text" placeholder="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                        <div className="wp-contacts-list">
                            {Object.keys(groupedContacts).sort().map(letter => (
                                <div key={letter}>
                                    <div className="wp-contact-letter">{letter}</div>
                                    {groupedContacts[letter].map(contact => (
                                        <div key={contact.id} className="wp-contact-item" onClick={() => setSelectedContact(contact)}>
                                            <img src={contact.photo} alt={contact.name} className="wp-contact-photo" />
                                            <span className="wp-contact-item-name">{contact.name}</span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {pivot === 'recent' && (
                    <div className="wp-recent-contacts">
                        {CONTACTS.slice(0, 5).map(contact => (
                            <div key={contact.id} className="wp-contact-item" onClick={() => setSelectedContact(contact)}>
                                <img src={contact.photo} alt={contact.name} className="wp-contact-photo" />
                                <span className="wp-contact-item-name">{contact.name}</span>
                            </div>
                        ))}
                    </div>
                )}

                {pivot === 'what' && (
                    <div className="wp-whats-new">
                        <p className="wp-empty-text">no new updates from your contacts</p>
                    </div>
                )}
            </div>
        </AppShell>
    );
}
