import { AntDesign } from '@expo/vector-icons';
import React, { FC } from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface CreateTaskProps {
    isOpen: boolean;
    handleClose: () => void;
    addTask: () => Promise<any>;
    title: string;
    setTitle: (text: string) => void;
    description: string;
    setDescription: (text: string) => void;
    loading: boolean;
}

const CreateTask: FC<CreateTaskProps> = ({ isOpen, handleClose, addTask, title, setTitle, description, setDescription, loading }) => {

    return (
        <Modal
            animationType="slide"
            // transparent={true}
            onRequestClose={handleClose}
            visible={isOpen}
        >
            <View style={styles.modal}>

                <View style={styles.header}>
                    <TouchableOpacity style={{ alignContent: "center", justifyContent: "center", padding: 8 }}>
                        <AntDesign name="close" size={24} color="#1e293b" onPress={handleClose} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Add Task</Text>
                </View>

                <View style={styles.create}>
                    <View style={styles.todoTitle}>
                        <Text style={styles.label}>
                            Task Name
                        </Text>
                        <TextInput
                            placeholder="Example: Buy Groceries"
                            style={styles.titleInput}
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                        />
                    </View>
                    <View style={styles.todoDescription}>
                        <Text style={styles.label}>
                            Task Description
                        </Text>
                        <TextInput
                            placeholder="Milk, Eggs, Bread, etc."
                            style={styles.descriptionInput}
                            multiline={true}
                            value={description}
                            onChangeText={(text) => setDescription(text)}
                        />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        // disabled={!title || !description || loading}
                        style={loading ? [styles.button, { opacity: 0.5 }] : styles.button}
                        onPress={addTask}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" style={{ marginRight: 6 }} />
                        ) : null}
                        <Text style={styles.buttonText}>
                            {loading ? "Creating ..." : "Create"}
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    )
}

export default CreateTask

const styles = StyleSheet.create({
    modal: {
        backgroundColor: "#fff",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        padding: 16
    },
    header: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        // flex: 1
    },
    title: {
        fontSize: 18,
        fontFamily: "DMMedium",
        color: "#1e293b",
        marginRight: 8
    },
    create: {
        width: "100%",
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        height: "100%",
        paddingTop: 16,
    },
    todoTitle: {
        width: "100%",
        paddingVertical: 8,
        paddingHorizontal: 4,
        marginBottom: 16,
    },
    label: {
        fontFamily: "DMMedium",
        fontSize: 14,
        color: "#1e293b",
        marginBottom: 8,
    },
    titleInput: {
        width: "100%",
        height: 45,
        backgroundColor: "#f3f4f6",
        borderRadius: 10,
        paddingHorizontal: 16,
        fontFamily: "DMRegular",
        fontSize: 14,
        color: "#475569",
    },
    todoDescription: {
        width: "100%",
        paddingVertical: 8,
        paddingHorizontal: 4,
        marginBottom: 16,
    },
    descriptionInput: {
        width: "100%",
        height: 100,
        backgroundColor: "#f3f4f6",
        borderRadius: 10,
        paddingHorizontal: 16,
        fontFamily: "DMRegular",
        fontSize: 14,
        color: "#475569",
        textAlignVertical: "top",
        paddingVertical: 12,
        flexWrap: "wrap",
    },
    buttonContainer: {
        width: "100%",
        paddingVertical: 8,
        paddingHorizontal: 4,
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    button: {
        width: "100%",
        height: 45,
        backgroundColor: "#f87171",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
    },
    buttonText: {
        fontFamily: "DMBold",
        fontSize: 14,
        color: "#fff",
    }
})