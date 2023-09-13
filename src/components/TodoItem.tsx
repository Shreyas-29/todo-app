import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import { Todo } from '../types/todo'

interface TodoItemProps {
    todo: Todo;
    input: string;
}

const TodoItem: FC<TodoItemProps> = ({ todo, input }) => {

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

    return (
        <TouchableOpacity
            // key={todo.taskId || todo.title}
            style={styles.todoCard}
        >
            <LinearGradient
                colors={["#fca5a5", "#f87171"]}
                style={styles.todo}
                start={{ x: 2, y: 2 }}
                end={{ x: 0, y: 0 }}
            >
                <View style={styles.todoTitle}>
                    <Text style={{ fontFamily: "DMBold", color: "#fff", fontSize: 16, flex: 1 }}>
                        {todo.title}
                    </Text>
                    <Text style={styles.todoDate}>
                        {formattedDate(todo.date)}
                    </Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default TodoItem

const styles = StyleSheet.create({
    todoCard: {
        width: "100%",
        height: "auto",
        borderRadius: 15,
        backgroundColor: "#fff",
        marginBottom: 16,
        flex: 1
    },
    todo: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 15,
        backgroundColor: "rgba(248, 113, 113, 0.8)",
        width: "100%",
        position: "relative",
    },
    todoTitle: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 12,
        paddingBottom: 24,
        paddingHorizontal: 8,
        borderRadius: 15,
        // backgroundColor: "#fca5a5",
        width: "100%",
        fontFamily: "DMRegular",
        fontSize: 16,
        color: "#fff",
    },
    todoDate: {
        fontSize: 12,
        color: "#f9fafb",
        fontFamily: "DMRegular",
        position: "absolute",
        bottom: 2,
        right: 2,
    },
})