import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';

export default function VisualizarRelatorio({ route, navigation }) {
    const { relatorio } = route.params;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPdf = async () => {
            if (relatorio.pdfUri) {
                try {
                    await Print.printAsync({ uri: relatorio.pdfUri });
                    setLoading(false);
                } catch (error) {
                    Alert.alert('Erro', 'PDF não disponível para visualização.');
                    setLoading(false);
                }
            } else {
                Alert.alert('Erro', 'PDF não disponível para visualização.');
                setLoading(false);
            }
        };
        loadPdf();
    }, [relatorio.pdfUri]);

    const sharePDF = async (uri) => {
        if (!(await Sharing.isAvailableAsync())) {
            Alert.alert('Erro', 'O compartilhamento não está disponível nesta plataforma');
            return;
        }
        await Sharing.shareAsync(uri);
    };

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <AntDesign name="back" size={24} color="black" />
            </TouchableOpacity>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
            ) : null}
            <TouchableOpacity style={styles.shareButton} onPress={() => sharePDF(relatorio.pdfUri)}>
                <Text style={styles.shareButtonText}>Compartilhar PDF</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
    },
    shareButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    shareButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});
