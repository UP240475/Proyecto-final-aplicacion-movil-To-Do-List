    import { useEffect, useState } from "react";
    import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TextInput,
    TouchableOpacity,
    } from "react-native";
    import TodoCard from "../components/TodoCard";

    const BASE_URL = "http://192.168.101.2:3000"; //  CAMBIA SI ES NECESARIO

    export default function Home() {
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    //  GET
    const getTodos = async () => {
        try {
        setLoading(true);

        const res = await fetch(`${BASE_URL}/todos`);
        const data = await res.json();

        console.log("API:", data);

        if (data.success && Array.isArray(data.data)) {
            setResults(data.data);
        } else {
            setResults([]);
        }
        } catch (error) {
        console.log("ERROR:", error);
        setResults([]);
        } finally {
        setLoading(false);
        }
    };

    //  CREATE
        const addTodo = async () => {
    if (!title.trim()) return;

    try {
        const res = await fetch(`${BASE_URL}/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            description: description,
        }),
        });

        const data = await res.json();

        console.log("CREATE:", data); //  VER ESTO

        setTitle("");
        setDescription("");

        getTodos();
    } catch (error) {
        console.log("ERROR ADD:", error);
    }
    };

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <View style={styles.container}>
        <Text style={styles.title}> Mis Tareas</Text>

        {/*  FORMULARIO */}
        <View style={styles.form}>
            <TextInput
            placeholder="Título"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            />

            <TextInput
            placeholder="Descripción"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            />

            <TouchableOpacity style={styles.button} onPress={addTodo}>
            <Text style={styles.buttonText}>Agregar</Text>
            </TouchableOpacity>
        </View>

        {/*  LISTA */}
        {loading ? (
            <ActivityIndicator size="large" />
        ) : results.length > 0 ? (
            <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TodoCard {...item} refresh={getTodos} />
            )}
            />
        ) : (
            <Text style={styles.empty}>No hay tareas </Text>
        )}
        </View>
    );
    }



    const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f2f2f2",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 15,
    },
    form: {
        marginBottom: 20,
        gap: 10,
    },
    input: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 8,
    },
    button: {
        backgroundColor: "#2196F3",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    empty: {
        textAlign: "center",
        marginTop: 50,
        color: "#777",
    },
    });