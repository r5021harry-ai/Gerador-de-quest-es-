import streamlit as st
from google import genai

# ---------------------------------------------------------
# CONFIGURAÇÃO DA PÁGINA
# ---------------------------------------------------------
st.set_page_config(
    page_title="SimulaFCC • SEDUC-MA",
    page_icon="🎓",
    layout="wide"
)

# ---------------------------------------------------------
# GERENCIAMENTO DA CHAVE API (Pede apenas uma vez)
# ---------------------------------------------------------
if "api_key" not in st.session_state:
    st.session_state.api_key = ""

with st.sidebar:
    st.title("⚙️ Configurações")
    key_input = st.text_input(
        "Cole sua Gemini API Key:", 
        value=st.session_state.api_key, 
        type="password",
        help="A chave fica salva durante o uso da sessão."
    )
    if key_input:
        st.session_state.api_key = key_input
        st.success("API Key guardada com sucesso!")

# ---------------------------------------------------------
# ESTILIZAÇÃO CSS CUSTOMIZADA (Tema SimulaFCC - Imagem 2)
# ---------------------------------------------------------
st.markdown("""
<style>
    /* Fundo Escuro do App */
    .stApp {
        background-color: #0b0f19;
        color: #e2e8f0;
    }
    
    /* Topbar Customizada */
    .top-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid #1e293b;
        margin-bottom: 20px;
    }
    
    .badge-tag {
        background-color: #854d0e;
        color: #fef08a;
        padding: 3px 8px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: bold;
    }

    /* Card do Plano de Reforço (Rosa/Vinho) */
    .reforco-card {
        background: linear-gradient(90deg, #31131d 0%, #17132a 100%);
        border: 1px solid #9f1239;
        border-radius: 10px;
        padding: 18px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
    }

    /* Container Principal das Opções */
    .config-card {
        background-color: #111827;
        border: 1px solid #1f2937;
        border-radius: 12px;
        padding: 24px;
    }

    /* Botões do Menu Superior */
    div.stButton > button {
        border-radius: 8px;
        border: 1px solid #334155;
        background-color: #1e293b;
        color: #f8fafc;
        font-weight: 500;
    }
    
    div.stButton > button:hover {
        border-color: #6366f1;
        color: #818cf8;
    }
</style>
""", unsafe_allow_html=True)

# ---------------------------------------------------------
# TOPO DO APP E ESTATÍSTICAS
# ---------------------------------------------------------
top_col1, top_col2 = st.columns([2, 1])

with top_col1:
    st.markdown("## 🎓 **SimulaFCC** <span class='badge-tag'>SEDUC-MA • Ensino Médio</span>", unsafe_allow_html=True)
    st.caption("Magistério Ensino Médio: História & Biologia • Fundação Carlos Chagas")

with top_col2:
    s1, s2, s3 = st.columns(3)
    s1.metric("Respondidas", "5")
    s2.metric("Aproveitamento", "40%")
    s3.metric
