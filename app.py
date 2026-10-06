import os
import streamlit as st
from google import genai

# Configuração da página do Streamlit
st.set_page_config(page_title="Meu App Google AI", page_icon="🤖")
st.title("🤖 Meu App com Google AI")

# Configurar a API Key (Pode ser via input ou variável de ambiente)
api_key = st.sidebar.text_input("Cole sua Gemini API Key:", type="password")

if api_key:
    # Inicializar o cliente com a nova biblioteca do Gemini
    client = genai.Client(api_key=api_key)

    # Campo para o usuário enviar mensagens
    user_input = st.text_area("Digite sua pergunta ou instrução:")

    if st.button("Enviar"):
        if user_input:
            with st.spinner("Gerando resposta..."):
                try:
                    # Chamar o modelo (exemplo com gemini-2.5-flash)
                    response = client.models.generate_content(
                        model="gemini-2.5-flash",
                        contents=user_input,
                    )
                    st.subheader("Resposta:")
                    st.write(response.text)
                except Exception as e:
                    st.error(f"Erro ao processar: {e}")
        else:
            st.warning("Por favor, insira algum texto antes de enviar.")
else:
    st.info("Insira sua Gemini API Key na barra lateral para começar.")
