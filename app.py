import time
import streamlit as st
from google import genai
from google.genai.errors import APIError

# ---------------------------------------------------------
# CONFIGURAÇÃO DA PÁGINA
# ---------------------------------------------------------
st.set_page_config(
    page_title="SimulaFCC • SEDUC-MA",
    page_icon="🎓",
    layout="wide"
)

# ---------------------------------------------------------
# GERENCIAMENTO DA CHAVE API
# ---------------------------------------------------------
if "api_key" not in st.session_state:
    st.session_state.api_key = ""

with st.sidebar:
    st.title("⚙️ Configurações")
    key_input = st.text_input(
        "Cole sua Gemini API Key:", 
        value=st.session_state.api_key, 
        type="password",
        help="A chave permanece salva durante a sessão."
    )
    if key_input:
        st.session_state.api_key = key_input
        st.success("API Key salva com sucesso!")

# ---------------------------------------------------------
# ESTILIZAÇÃO CSS AVANÇADA (Layout Dashboard)
# ---------------------------------------------------------
st.markdown("""
<style>
    /* Fundo Escuro */
    .stApp {
        background-color: #0b0f19;
        color: #f8fafc;
    }
    
    /* Topbar Header */
    .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #0f172a;
        padding: 12px 24px;
        border-radius: 12px;
        border: 1px solid #1e293b;
        margin-bottom: 20px;
    }
    
    .logo-title {
        font-size: 22px;
        font-weight: 800;
        color: #ffffff;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .badge-fcc {
        background-color: #854d0e;
        color: #fef08a;
        padding: 3px 8px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: bold;
    }

    /* Card de Reforço (Banner Rosado) */
    .reforco-box {
        background: linear-gradient(90deg, #31131d 0%, #1e1b4b 100%);
        border: 1px solid #e11d48;
        border-radius: 12px;
        padding: 18px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
    }

    /* Container Principal */
    .main-card {
        background-color: #111827;
        border: 1px solid #1f2937;
        border-radius: 16px;
        padding: 24px;
        margin-bottom: 20px;
    }

    /* Botão de Destaque */
    .stButton > button {
        border-radius: 8px;
        border: 1px solid #334155;
        background-color: #1e293b;
        color: #ffffff;
        font-weight: 600;
        transition: all 0.2s ease;
    }
    
    .stButton > button:hover {
        border-color: #6366f1;
        background-color: #312e81;
        color: #ffffff;
    }
</style>
""", unsafe_allow_html=True)

# ---------------------------------------------------------
# CABEÇALHO DO DASHBOARD
# ---------------------------------------------------------
col_header1, col_header2 = st.columns([2, 1])

with col_header1:
    st.markdown("""
        <div class="logo-title">
            🎓 SimulaFCC 
            <span class="badge-fcc">SEDUC-MA • Ensino Médio</span>
        </div>
        <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">
            Magistério Ensino Médio: História & Biologia • Fundação Carlos Chagas
        </div>
    """, unsafe_allow_html=True)

with col_header2:
    m1, m2, m3 = st.columns(3)
    m1.metric("Respondidas", "5")
    m2.metric("Aproveitamento", "40%")
    m3.metric("Ofensiva", "🔥 1 dia")

st.write("")

# Menu de Navegação Superior
n1, n2, n3, n4, n5, n6 = st.columns(6)
n1.button("➕ Novo Simulado", type="primary", use_container_width=True)
n2.button("🔄 Reforço (3)", use_container_width=True)
n3.button("📖 Caderno de Erros", use_container_width=True)
n4.button("📈 Estatísticas", use_container_width=True)
n5.button("📜 Histórico", use_container_width=True)
n6.button("📄 Edital Base", use_container_width=True)

st.write("")

# ---------------------------------------------------------
#import time
import streamlit as st
from google import genai
from google.genai.errors import APIError

# ---------------------------------------------------------
# CONFIGURAÇÃO DA PÁGINA
# ---------------------------------------------------------
st.set_page_config(
    page_title="SimulaFCC • SEDUC-MA",
    page_icon="🎓",
    layout="wide"
)

# ---------------------------------------------------------
# GERENCIAMENTO DA CHAVE API
# ---------------------------------------------------------
if "api_key" not in st.session_state:
    st.session_state.api_key = ""

with st.sidebar:
    st.title("⚙️ Configurações")
    key_input = st.text_input(
        "Cole sua Gemini API Key:", 
        value=st.session_state.api_key, 
        type="password",
        help="A chave permanece salva durante a sessão."
    )
    if key_input:
        st.session_state.api_key = key_input
        st.success("API Key salva com sucesso!")

# ---------------------------------------------------------
# ESTILIZAÇÃO CSS AVANÇADA (Layout Dashboard)
# ---------------------------------------------------------
st.markdown("""
<style>
    /* Fundo Escuro */
    .stApp {
        background-color: #0b0f19;
        color: #f8fafc;
    }
    
    /* Topbar Header */
    .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #0f172a;
        padding: 12px 24px;
        border-radius: 12px;
        border: 1px solid #1e293b;
        margin-bottom: 20px;
    }
    
    .logo-title {
        font-size: 22px;
        font-weight: 800;
        color: #ffffff;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .badge-fcc {
        background-color: #854d0e;
        color: #fef08a;
        padding: 3px 8px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: bold;
    }

    /* Card de Reforço (Banner Rosado) */
    .reforco-box {
        background: linear-gradient(90deg, #31131d 0%, #1e1b4b 100%);
        border: 1px solid #e11d48;
        border-radius: 12px;
        padding: 18px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
    }

    /* Container Principal */
    .main-card {
        background-color: #111827;
        border: 1px solid #1f2937;
        border-radius: 16px;
        padding: 24px;
        margin-bottom: 20px;
    }

    /* Botão de Destaque */
    .stButton > button {
        border-radius: 8px;
        border: 1px solid #334155;
        background-color: #1e293b;
        color: #ffffff;
        font-weight: 600;
        transition: all 0.2s ease;
    }
    
    .stButton > button:hover {
        border-color: #6366f1;
        background-color: #312e81;
        color: #ffffff;
    }
</style>
""", unsafe_allow_html=True)

# ---------------------------------------------------------
# CABEÇALHO DO DASHBOARD
# ---------------------------------------------------------
col_header1, col_header2 = st.columns([2, 1])

with col_header1:
    st.markdown("""
        <div class="logo-title">
            🎓 SimulaFCC 
            <span class="badge-fcc">SEDUC-MA • Ensino Médio</span>
        </div>
        <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">
            Magistério Ensino Médio: História & Biologia • Fundação Carlos Chagas
        </div>
    """, unsafe_allow_html=True)

with col_header2:
    m1, m2, m3 = st.columns(3)
    m1.metric("Respondidas", "5")
    m2.metric("Aproveitamento", "40%")
    m3.metric("Ofensiva", "🔥 1 dia")

st.write("")

# Menu de Navegação Superior
n1, n2, n3, n4, n5, n6 = st.columns(6)
n1.button("➕ Novo Simulado", type="primary", use_container_width=True)
n2.button("🔄 Reforço (3)", use_container_width=True)
n3.button("📖 Caderno de Erros", use_container_width=True)
n4.button("📈 Estatísticas", use_container_width=True)
n5.button("📜 Histórico", use_container_width=True)
n6.button("📄 Edital Base", use_container_width=True)

st.write("")

# ---------------------------------------------------------
#
