    import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
    import { useRouter } from "expo-router";

    const BASE_URL = "http://192.168.101.2:3000";

    export default function TodoCard({
    id,
    title,
    description,
    completed,
    refresh,
    }: any) {
    const router = useRouter();

    //  ELIMINAR
    const handleDelete = async () => {
        try {
        await fetch(`${BASE_URL}/todos/${id}`, {
            method: "DELETE",
        });

        refresh();
        } catch (error) {
        console.log("Error deleting:", error);
        }
    };

    //  CHECKBOX
    const toggleComplete = async () => {
        try {
        await fetch(`${BASE_URL}/todos/${id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            title,
            description,
            completed: !completed,
            }),
        });

        refresh();
        } catch (error) {
        console.log("Error updating:", error);
        }
    };

    return (
        <View style={styles.card}>
        {/*  CHECKBOX + TEXTO */}
        <View style={styles.row}>
            <TouchableOpacity onPress={toggleComplete}>
            <Text style={styles.checkbox}>
                {completed ? "✅" : "⬜"}
            </Text>
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
            <Text
                style={[
                styles.title,
                completed && { textDecorationLine: "line-through", color: "#999" },
                ]}
            >
                {title}
            </Text>

            <Text style={styles.desc}>{description}</Text>
            </View>
        </View>

        {/*  BOTONES */}
        <View style={styles.buttons}>
            <TouchableOpacity
            style={styles.edit}
            onPress={() => router.push(`/${id}`)}
            >
            <Text style={styles.btnText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.delete} onPress={handleDelete}>
            <Text style={styles.btnText}>Eliminar</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
    }

    const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    checkbox: {
        fontSize: 22,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    desc: {
        marginTop: 3,
        color: "#555",
    },
    buttons: {
        flexDirection: "row",
        marginTop: 12,
        gap: 10,
    },
    edit: {
        backgroundColor: "#4CAF50",
        padding: 8,
        borderRadius: 6,
    },
    delete: {
        backgroundColor: "#f44336",
        padding: 8,
        borderRadius: 6,
    },
    btnText: {
        color: "#fff",
        fontWeight: "bold",
    },
    });