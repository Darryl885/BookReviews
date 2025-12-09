import { createContext, useState, useEffect } from "react";
import { getBooks, createBook, deleteBook } from "../services/BookServices";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);

    //  Charger les livres au démarrage
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await getBooks();
                setBooks(data);
            } catch (error) {
                console.error("Erreur de chargement :", error);
            }
        };
        fetchBooks();
    }, []);

    // Ajouter un livre
    const addBook = async (bookData) => {
        try {
            const newBook = await createBook(bookData);
            setBooks([...books, newBook]);
        } catch (error) {
            console.error("Erreur d'ajout :", error);
        }
    };

    //  Supprimer un livre
    const removeBook = async (id) => {
        try {
            await deleteBook(id);
            setBooks(books.filter(book => book.id !== id));
        } catch (error) {
            console.error("Erreur de suppression :", error);
        }
    };

    return (
        <BookContext.Provider value={{ books, addBook, removeBook }}>
            {children}
        </BookContext.Provider>
    );
};
