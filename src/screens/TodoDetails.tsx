import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { FC, useState } from 'react';
import { ActivityIndicator, LayoutAnimation, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Todo } from '../types/todo';

interface TodoDetailsProps {
    route: {
        params: {
            todo: Todo;
        }
    };
};

const TodoDetails: FC<TodoDetailsProps> = ({ route }) => {

    const { todo } = route?.params;

    const [status, setStatus] = useState(todo.status);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const handleDelete = async () => {
        setLoading(true);
        const deleteTodo = todo;

        try {
            await AsyncStorage.removeItem(`task_${deleteTodo.taskId}`);
            ToastAndroid.show('Task deleted successfully', ToastAndroid.SHORT);
            // @ts-ignore
            navigation.navigate("Home");
        } catch (error) {
            console.log("Error deleting task: ", error);
            ToastAndroid.show("Unable to delete task ☹️", ToastAndroid.SHORT);
        } finally {
            setLoading(false);
        }
    };

    const handleComplete = async () => {
        const newStatus = status === 'todo' ? 'done' : 'todo';

        setStatus(newStatus);

        const customLayoutAnimation = {
            duration: 300, // Adjust the duration as needed
            create: {
                type: LayoutAnimation.Types.easeIn,
                property: LayoutAnimation.Properties.opacity,
            },
            update: {
                type: LayoutAnimation.Types.easeIn,
                property: LayoutAnimation.Properties.opacity,
            },
            delete: {
                type: LayoutAnimation.Types.easeOut,
                property: LayoutAnimation.Properties.opacity,
            },
        };

        LayoutAnimation.configureNext(customLayoutAnimation);

        try {
            const updatedTodo = { ...todo, status: newStatus };
            await AsyncStorage.setItem(`task_${updatedTodo.taskId}`, JSON.stringify(updatedTodo));
        } catch (error) {
            console.log("Error updating task status in local storage: ", error);
            ToastAndroid.show("Unable to update task status", ToastAndroid.SHORT);
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* @ts-ignore */}
                <TouchableOpacity style={styles.headerBox} onPress={() => navigation.navigate("Home")} >
                    <Feather name="arrow-left" size={22} color="#334155" />
                    <Text style={styles.headerText}>
                        Back
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.details}>
                <Text style={styles.titleLabel}>
                    Title
                </Text>
                <Text style={styles.title}>
                    {todo.title}
                </Text>
                <Text style={styles.descriptionLabel}>
                    Description
                </Text>
                <Text style={styles.description}>
                    {todo.description}
                </Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={handleComplete}
                >
                    {status === 'todo' ? (
                        <Ionicons name="ios-radio-button-off" size={20} color="#fff" />
                    ) : (
                        <Ionicons name="ios-checkmark-circle" size={20} color="#fff" />
                    )}
                    <Text style={styles.actionButtonText}>
                        {status === "todo" ? "Incomplete" : "Finished"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={loading}
                    onPress={handleDelete}
                    style={styles.actionButtonDanger}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <MaterialIcons name="delete-outline" size={20} color="#fff" />
                    )}
                    <Text style={styles.actionButtonText}>
                        {loading ? "Deleting..." : "Delete"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TodoDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 32,
        height: '100%'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 24,
        paddingHorizontal: 20,
    },
    headerBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 16,
        fontFamily: 'DMMedium',
        color: '#334155',
        marginLeft: 10
    },
    details: {
        marginTop: 40,
        paddingHorizontal: 20,
        flex: 1,
    },
    titleLabel: {
        fontSize: 16,
        fontFamily: 'DMMedium',
        color: '#475569',
    },
    title: {
        fontSize: 24,
        fontFamily: 'DMBold',
        color: '#1e293b',
    },
    descriptionLabel: {
        fontSize: 16,
        fontFamily: 'DMMedium',
        color: '#475569',
        marginTop: 20
    },
    description: {
        fontSize: 16,
        fontFamily: 'DMMedium',
        color: '#1e293b',
        marginTop: 4
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 24,
        paddingHorizontal: 20,
        flex: 1,
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
    },
    actionButton: {
        backgroundColor: '#334155',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4
    },
    actionButtonText: {
        fontSize: 16,
        fontFamily: 'DMMedium',
        color: '#fff',
    },
    actionButtonDanger: {
        backgroundColor: '#ef4444',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4
    },
})