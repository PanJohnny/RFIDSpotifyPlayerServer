import { useEffect, useState } from "react";

export default function CardTable() {
    // List of cards fetched from the API
    const [cards, setCards] = useState([]);
    // Form state for adding/editing a card
    const [form, setForm] = useState({ id: "", uri: "", active: false, action: "" });
    // Flag to indicate if we're in editing mode
    const [editing, setEditing] = useState(false);

    // Fetch cards from the API
    const refreshData = async () => {
        try {
            const res = await fetch("/api/v1/cards");
            const data = await res.json();
            setCards(data);
        } catch (error) {
            console.error("Error fetching cards:", error);
        }
    };

    // Load the card data when the component mounts
    useEffect(() => {
        refreshData();
    }, []);

    // Handle input changes; checkboxes use checked instead of value
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Add a new card. If a card with the same ID exists, alert the user.
    const handleAdd = async (e) => {
        e.preventDefault();
        if (cards.find((card) => card.id === form.id)) {
            alert("A card with this ID already exists. Please use a unique ID or edit the existing card.");
            return;
        }
        try {
            await fetch("/api/v1/cards", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            setForm({ id: "", uri: "", active: false, action: "" });
            refreshData();
        } catch (error) {
            console.error("Error adding card:", error);
        }
    };

    // Update an existing card
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await fetch("/api/v1/cards", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            setEditing(false);
            setForm({ id: "", uri: "", active: false, action: "" });
            refreshData();
        } catch (error) {
            console.error("Error updating card:", error);
        }
    };

    // Delete a card after user confirmation
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this card?")) return;
        try {
            await fetch("/api/v1/cards", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            refreshData();
        } catch (error) {
            console.error("Error deleting card:", error);
        }
    };

    // Set the form to the selected card's data and switch to editing mode
    const handleEdit = (card) => {
        setEditing(true);
        setForm(card);
    };

    // Cancel editing and reset the form
    const handleCancel = () => {
        setEditing(false);
        setForm({ id: "", uri: "", active: false, action: "" });
    };

    return (
        <div>
            <h2>Karty</h2>
            <table border="1" cellPadding="5" cellSpacing="0">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>URI</th>
                    <th title={"Přiložena"}>Aktivní</th>
                    <th>Akce</th>
                    <th>Úpravy</th>
                </tr>
                </thead>
                <tbody>
                {cards.map((card) => (
                    <tr key={card.id}>
                        <td>{card.id}</td>
                        <td>{card.uri}</td>
                        <td>{card.active ? "Yes" : "No"}</td>
                        <td>{card.action}</td>
                        <td>
                            <button onClick={() => handleEdit(card)}>Edit</button>
                            <button onClick={() => handleDelete(card.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                {cards.length === 0 && (
                    <tr>
                        <td colSpan="5" style={{ textAlign: "center" }}>
                            No cards found.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            <h2>{editing ? "Přidej kartu" : "Uprav kartu"}</h2>
            <form onSubmit={editing ? handleUpdate : handleAdd}>
                <div>
                    <label htmlFor="id">ID:</label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={form.id}
                        onChange={handleChange}
                        placeholder="ID"
                        disabled={editing} // Prevent changing the ID during editing
                        required
                    />
                </div>
                <div>
                    <label htmlFor="uri">URI:</label>
                    <input
                        type="text"
                        id="uri"
                        name="uri"
                        value={form.uri}
                        onChange={handleChange}
                        placeholder="URI"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="active">Aktivní (pouze pro testování):</label>
                    <input
                        type="checkbox"
                        id="active"
                        name="active"
                        checked={form.active}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="action">Akce (play, queue, state):</label>
                    <input
                        type="text"
                        id="action"
                        name="action"
                        value={form.action}
                        onChange={handleChange}
                        placeholder="Action"
                        required
                    />
                </div>
                <div style={{ marginTop: "1em" }}>
                    <button type="submit">{editing ? "Update Card" : "Add Card"}</button>
                    {editing && (
                        <button type="button" onClick={handleCancel} style={{ marginLeft: "1em" }}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
