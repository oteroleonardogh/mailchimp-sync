const { sync } = requiere('../../services/contacts');

module.exports = async (req, res) => {
    const synchedContacts = await sync();
    res.json(synchedContacts);
};
