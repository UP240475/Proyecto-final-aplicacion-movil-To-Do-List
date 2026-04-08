    import { useLocalSearchParams, useRouter } from "expo-router";
    import { useEffect, useState } from "react";
    import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    } from "react-native";

    const BASE_URL = "http://192.168.101.2:3000";

    export default function TodoDetail() {
    const params = useLocalSearchParams();
    const router = useRouter();

    const [todo, setTodo] = useState<any>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    const getTodo = async () => {
        const res = await fetch(`${BASE_URL}/todos/${id}`);
        const data = await res.json();

        setTodo(data.data);
        setTitle(data.data.title);
        setDescription(data.data.description);
    };

    const updateTodo = async () => {
        if (!title || !description) {
        Alert.alert("Llena todos los campos");
        return;
        }

        await fetch(`${BASE_URL}/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title,
            description,
            completed: todo.completed,
        }),
        });

        router.back(); //  REGRESA
    };

    useEffect(() => {
        getTodo();
    }, []);

    if (!todo) return <Text>Cargando...</Text>;

    return (
        <View style={styles.container}>
        <Text style={styles.title}> Editar tarea</Text>

        <TextInput
            value={title}
            onChangeText={setTitle}
            style={styles.input}
        />

        <TextInput
            value={description}
            onChangeText={setDescription}
            style={styles.input}
        />

        <TouchableOpacity style={styles.btn} onPress={updateTodo}>
            <Text style={styles.btnText}>Guardar cambios</Text>
        </TouchableOpacity>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#eef1f5",
        flex: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
    },
    input: {
        backgroundColor: "white",
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    btn: {
        backgroundColor: "#4caf50",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    btnText: {
        color: "white",
        fontWeight: "bold",
    },
    });