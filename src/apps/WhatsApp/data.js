export const CHATS = [
    { id: 1, name: 'Whitmans Chat', message: 'Ned: Yeah, I think I know what you...', time: '11:45', unread: 0, photo: 'https://i.pravatar.cc/100?img=11', isGroup: true, isFavorite: true },
    { id: 2, name: 'Stewart Family', message: 'Steve: Great, thanks!', time: '11:39', unread: 1, photo: null, isGroup: true, isFavorite: false },
    { id: 3, name: 'Alice Whitman', message: 'Image', time: '10:50', unread: 0, photo: 'https://i.pravatar.cc/100?img=5', isFavorite: true },
    { id: 4, name: 'Jack Whitman', message: '🎵 0:07', time: '6/30', unread: 0, photo: 'https://i.pravatar.cc/100?img=12', isFavorite: false },
    { id: 5, name: 'Lunch Group', message: 'Sounds good!', time: '6/29', unread: 0, photo: null, isGroup: true, isFavorite: false },
    { id: 6, name: 'Jane Pearson', message: '👋🏻', time: '6/29', unread: 0, photo: 'https://i.pravatar.cc/100?img=9', isFavorite: true },
    { id: 7, name: 'Divya Sarin', message: '+1 890 567 1234 joined', time: '6/28', unread: 0, photo: 'https://i.pravatar.cc/100?img=25', isFavorite: false },
    { id: 8, name: 'Sai Tambe', message: 'See you tomorrow!', time: '6/28', unread: 0, photo: 'https://i.pravatar.cc/100?img=15', isFavorite: false },
];

export const CALLS = [
    { id: 1, name: 'Alice Whitman', type: 'incoming', time: 'Yesterday, 3:45 PM', photo: 'https://i.pravatar.cc/100?img=5' },
    { id: 2, name: 'Jack Whitman', type: 'outgoing', time: 'Monday, 2:30 PM', photo: 'https://i.pravatar.cc/100?img=12' },
    { id: 3, name: 'Jane Pearson', type: 'missed', time: 'Sunday, 10:15 AM', photo: 'https://i.pravatar.cc/100?img=9' },
];

export const CHAT_MESSAGES = {
    3: [
        { id: 1, text: 'Hey! How are you?', sender: 'them', time: '10:30' },
        { id: 2, text: "I'm good! Just got back from vacation", sender: 'me', time: '10:32' },
        { id: 3, text: 'Nice! 😊', sender: 'them', time: '10:48', status: 'read' },
    ]
};
