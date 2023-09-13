import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CreateTask from '../components/CreateTask';
import { Todo } from '../types/todo';

const Todos = () => {

    const navigation = useNavigation();

    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
    const [showSearch, setShowSearch] = useState(false);

    const getTodos = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const todos = await AsyncStorage.multiGet(keys);

            const validTodos = todos
                .map(([key, value]) => {
                    try {
                        return JSON.parse(value!);
                    } catch (error) {
                        return null;
                    }
                })
                .filter((todo) => todo !== null);

            validTodos.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

            setTodos(validTodos);
            return validTodos;
        } catch (error) {
            console.error('Error fetching todos: ', error);
            setTodos([]);
            return [];
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        getTodos().then((todos) => setTodos(todos));
        setRefreshing(false);
    };

    useEffect(() => {
        // Filter the todos based on the search input
        const filtered = todos.filter((todo) =>
            todo.title.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredTodos(filtered);
    }, [input, todos]);

    const formattedDate = (dateString: string) => {
        const date = new Date(dateString);
        const options = {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        const formatted = date.toLocaleTimeString('en-in', options as any);
        return formatted.replace('at', '');
    };

    const handleClearStorage = async () => {
        try {
            // Clear all data in AsyncStorage
            await AsyncStorage.clear();
            console.log('AsyncStorage cleared successfully');
        } catch (error) {
            console.error('Error clearing AsyncStorage: ', error);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const addTask = async () => {
        try {
            setLoading(true);

            if (!title || !description) {
                return ToastAndroid.show("All fields are required", ToastAndroid.SHORT);
            }

            const task = {
                taskId: Math.random().toString(36).substring(7),
                title,
                description,
                date: new Date().toUTCString(),
                status: 'todo', // Set the initial status as 'todo'
            };

            await AsyncStorage.setItem(`task_${task.taskId}`, JSON.stringify(task));
            ToastAndroid.show('Task added successfully', ToastAndroid.SHORT);

            setTodos((prevTodos) => [...prevTodos, task]);
            setTitle('');
            setDescription('');
            handleClose();
        } catch (error) {
            console.log("Error adding task: ", error);
            ToastAndroid.show("Unable to create task ☹️", ToastAndroid.SHORT);
        } finally {
            setLoading(false);
        }
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient
                colors={["#fff", "#fef2f2"]}
                // colors={["#fef2f2", "#fecaca"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1, maxWidth: "100%" }}
            >
                <StatusBar style="auto" animated={true} backgroundColor={isOpen ? "#fff" : "#fff"} translucent={true} />
                <ScrollView
                    horizontal={false}
                    style={{ width: "100%", height: "100%", position: "relative" }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            colors={["#f87171", "#fca5a5"]}
                        />
                    }
                >
                    <View style={styles.container}>
                        <View style={styles.hero}>
                            {/* Header */}
                            <View style={styles.header}>
                                <Text style={styles.title}>Todos</Text>
                                <Ionicons name="ios-menu" size={24} color="black" />
                            </View>

                            {/* Progress */}
                            <View style={styles.progressBox}>
                                <Text style={styles.progressText}>
                                    Today's tasks
                                </Text>
                                <View style={styles.progressCircle}>
                                    <Text style={styles.progressCircleText}>
                                        40%
                                    </Text>
                                </View>
                            </View>

                            {/* Search */}
                            <View style={styles.search}>
                                <TextInput
                                    style={{ marginLeft: 8, fontSize: 16, fontFamily: "DMRegular", flex: 1 }}
                                    placeholder="Search your todos..."
                                    autoCapitalize="none"
                                    value={input}
                                    onChangeText={(text) => setInput(text)}
                                />
                                <TouchableOpacity style={styles.searchButton} onPress={() => setShowSearch(true)}>
                                    <Feather name="search" size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.todoHeader}>
                            <Text style={styles.todoHeading}>
                                My Tasks
                            </Text>
                            <Pressable onPress={handleClearStorage}>
                                <MaterialIcons name="delete-outline" size={24} color="#000" />
                            </Pressable>
                        </View>

                        {showSearch && input ? (
                            <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "flex-start", marginVertical: 16, width: "100%" }}>
                                {filteredTodos?.length === 0 ? (
                                    <View style={{ width: "100%", marginTop: 20, alignItems: "center", justifyContent: "flex-start", flex: 1 }}>
                                        <Text style={{ fontFamily: "DMRegular", fontSize: 16, color: "#334155" }}>
                                            No results found
                                        </Text>
                                    </View>
                                ) : null}
                                {filteredTodos?.map((item) => (
                                    <TouchableOpacity
                                        key={item.taskId || item.title}
                                        style={styles.todoCard}
                                        // @ts-ignore
                                        onPress={() => navigation.navigate("TodoDetails", {
                                            todo: item,
                                        })}
                                    >
                                        <LinearGradient
                                            colors={["#fca5a5", "#f87171"]}
                                            style={styles.todo}
                                            start={{ x: 2, y: 2 }}
                                            end={{ x: 0, y: 0 }}
                                        >
                                            <View style={styles.todoItem2}>
                                                <Text style={{ fontFamily: "DMBold", color: "#fff", fontSize: 16, flex: 1 }}>
                                                    {item.title}
                                                </Text>
                                                <Text style={styles.description}>
                                                    {item.description.length >= 15 ? `${item.description.slice(0, 15)}...` : item.description}
                                                </Text>
                                                <Text style={[styles.todoDate, { marginTop: 4 }]}>
                                                    {formattedDate(item.date)}
                                                </Text>
                                            </View>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ) : (
                            <View style={styles.todos}>
                                {todos?.length === 0 ? (
                                    <View style={{ width: "100%", marginTop: 20, alignItems: "center", justifyContent: "flex-start", flex: 1 }}>
                                        <Text style={{ fontFamily: "DMRegular", fontSize: 16, color: "#334155" }}>
                                            You all caught up!
                                        </Text>
                                    </View>
                                ) : null}
                                {todos?.map((todo) => (
                                    <View key={todo.taskId} style={{
                                        flex: 1,
                                        borderRadius: 30,
                                    }}>
                                        <TouchableOpacity
                                            style={input ? [{ display: "none" }] : styles.todoCard}
                                            // @ts-ignore
                                            onPress={() => navigation.navigate("TodoDetails", {
                                                todo: todo,
                                            })}
                                        >
                                            <LinearGradient
                                                colors={["#fca5a5", "#f87171"]}
                                                style={styles.todo}
                                                start={{ x: 1.5, y: 1.5 }}
                                                end={{ x: 0, y: 0 }}
                                            >
                                                <View style={styles.todoItem}>
                                                    <View style={styles.todoInner}>
                                                        <View style={{ width: 40, height: 10, borderRadius: 4, backgroundColor: "#fef2f2" }}></View>
                                                        <Text style={{ fontFamily: "DMMedium", color: "#fff", fontSize: 14, flex: 1, marginTop: 6 }}>
                                                            {todo.title}
                                                        </Text>
                                                        <View style={styles.todoFooter}>
                                                            <MaterialIcons name="bar-chart" size={20} color="#fff" />
                                                            <Text style={[styles.todoDate, { marginLeft: 8 }]}>
                                                                {formattedDate(todo.date)}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    {todo?.status === 'todo' ? (
                                                        <Ionicons name="ios-radio-button-off" size={20} color="#fff" />
                                                    ) : (
                                                        <Ionicons name="ios-checkmark-circle" size={20} color="#fff" />
                                                    )}
                                                </View>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                </ScrollView>

                {/* Add Button */}
                <View style={styles.add}>
                    <TouchableOpacity
                        style={styles.addBtn}
                        onPress={() => setIsOpen(true)}
                    >
                        <Feather name="plus" size={20} color="#f87171" />
                    </TouchableOpacity>
                </View>

                {/* Modal */}
                {isOpen && (
                    <CreateTask
                        isOpen={isOpen}
                        handleClose={handleClose}
                        addTask={addTask}
                        loading={loading}
                        title={title}
                        setTitle={setTitle}
                        description={description}
                        setDescription={setDescription}
                    />
                )}

            </LinearGradient>
        </SafeAreaView>
    )
}

export default Todos

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        position: "relative",
        flex: 1,
    },
    hero: {
        paddingVertical: 20,
    },
    header: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: "DMMedium"
    },
    greetings: {
        marginTop: 24,
        alignItems: 'flex-start',
        fontFamily: "DMMedium",
        textAlign: "start",
    },
    search: {
        marginTop: 24,
        alignItems: 'center',
        justifyContent: 'center',
        display: "flex",
        flexDirection: "row",
        paddingLeft: 10,
        borderRadius: 14,
        width: "100%",
        fontFamily: "DMRegular",
        fontSize: 16,
        color: "#4b5563",
        borderWidth: 1,
        borderColor: "#fecaca",
    },
    searchButton: {
        alignItems: 'center',
        justifyContent: 'center',
        display: "flex",
        flexDirection: "row",
        padding: 12,
        borderRadius: 12,
        backgroundColor: "#f87171",
        width: "auto",
    },
    add: {
        position: "absolute",
        bottom: 30,
        right: 30,
        backgroundColor: "#fff",
        width: 55,
        height: 55,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#f87171",
        shadowOffset: {
            width: 5,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
    },
    addBtn: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
    },
    todoHeader: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    todos: {
        marginTop: 24,
    },
    todoHeading: {
        fontSize: 16,
        fontFamily: "DMBold",
        color: "#1f2937",
    },
    todoCard: {
        width: "100%",
        borderRadius: 15,
        backgroundColor: "#fff",
        marginBottom: 16,
        flex: 1,
        shadowColor: "#ef4444",
        shadowOffset: {
            width: 5,
            height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 10,
        borderWidth: 1,
        borderTopColor: "rgba(248, 113, 113, 0.8)",
        borderRightColor: "#fca5a5",
        borderBottomColor: "#fca5a5",
        borderLeftColor: "#f87171",
    },
    todo: {
        paddingTop: 8,
        paddingHorizontal: 12,
        borderRadius: 14,
        width: "100%",
        position: "relative",
    },
    todoItem: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        paddingTop: 8,
        paddingBottom: 16,
        paddingHorizontal: 8,
        borderRadius: 15,
    },
    todoItem2: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        paddingTop: 8,
        paddingBottom: 16,
        paddingHorizontal: 8,
        borderRadius: 15,
    },
    todoInner: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        borderRadius: 15,
    },
    todoFooter: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        marginTop: 8,
    },
    todoDate: {
        fontSize: 12,
        color: "#f9fafb",
        fontFamily: "DMRegular",
    },
    description: {
        fontSize: 14,
        color: "#f9fafb",
        fontFamily: "DMRegular",
        marginTop: 2
    },
    progressBox: {
        marginTop: 12,
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#fecaca",
        borderWidth: 1.5,
        borderColor: "#fecaca",
    },
    progressText: {
        fontSize: 16,
        fontFamily: "DMBold",
        color: "#374151",
    },
    progressCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#f87171",
        borderWidth: 2.5,
        borderColor: "#f87171",
    },
    progressCircleText: {
        fontSize: 12,
        fontFamily: "DMMedium",
        color: "#f87171",
    }
});
