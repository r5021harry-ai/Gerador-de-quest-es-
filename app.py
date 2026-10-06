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
# BANNER DO PLANO DE REFORÇO
# ---------------------------------------------------------
st.markdown("""
<div class="reforco-box">
    <div>
        <h4 style="margin: 0; color: #fecdd3; font-size: 16px;">🎯 Plano de Reforço Ativo: 3 questão(ões) no Caderno de Erros</h4>
        <p style="margin: 4px 0 0 0; color: #fda4af; font-size: 13px;">Aumente sua retenção realizando um simulado focado especificamente nos conteúdos que você mais errou.</p>
    </div>
</div>
""", unsafe_allow_html=True)

# ---------------------------------------------------------
# CARDS DE CONFIGURAÇÃO
# ---------------------------------------------------------
st.markdown("### ⚙ Configurar Simulado FCC • SEDUC-MA")
st.caption("Personalize disciplina, profundidade e modo de treino da banca")

st.write("")

# 1. Área do Cargo
st.write("**Área do Cargo (Ensino Médio):**")
foco_cargo = st.radio(
    "Cargo", 
    ["Geral / Combinado", "Foco: Professor de História", "Foco: Professor de Biologia"],
    horizontal=True,
    label_visibility="collapsed"
)

st.write("")

# 2. Disciplinas do Edital em formato de Seleção
st.write("**1. DISCIPLINA DO EDITAL**")

c_disc1, c_disc2, c_disc3 = st.columns(3)

with c_disc1:
    disc_todas = st.checkbox("Todas as Disciplinas (Simulação Mista)", value=True)
    disc_legis = st.checkbox("Legislação Educacional e do Maranhão")

with c_disc2:
    disc_hist = st.checkbox("História (Ensino Médio)")
    disc_pedag = st.checkbox("Conhecimentos Pedagógicos e Didática")

with c_disc3:
    disc_bio = st.checkbox("Biologia (Ensino Médio)")
    disc_port = st.checkbox("Língua Portuguesa")

st.write("")

# 3. Nível de Dificuldade e Quantidade de Questões
col_dificuldade, col_quantidade = st.columns(2)

with col_dificuldade:
    st.write("**3. NÍVEL DE DIFICULDADE DA FCC**")
    dificuldade = st.radio(
        "Dificuldade",
        ["Todos", "Fácil", "Médio", "Difícil"],
        horizontal=True,
        label_visibility="collapsed"
    )
    st.caption("Equilíbrio real reproduzindo a composição da prova da SEDUC-MA.")

with col_quantidade:
    st.write("**4. QUANTIDADE DE QUESTÕES**")
    qtd_questoes = st.radio(
        "Quantidade",
        ["5 questões", "10 questões", "15 questões", "20 questões"],
        index=1,
        horizontal=True,
        label_visibility="collapsed"
    )
    st.caption("⏱️ Tempo recomendado FCC: ~30 minutos")

st.divider()

# ---------------------------------------------------------
# GERADOR DE SIMULADOS
# ---------------------------------------------------------
if st.button("🚀 GERAR SIMULADO AGORA", type="primary", use_container_width=True):
    if not st.session_state.api_key:
        st.error("⚠️ Insira a sua Gemini API Key no menu lateral para gerar as questões.")
    else:
        client = genai.Client(api_key=st.session_state.api_key)
        
        prompt = (
            "Você é a banca examinadora FCC (Fundação Carlos Chagas) para o concurso SEDUC-MA.\n"
            f"Gere um simulado completo com as seguintes especificações:\n"
            f"- Foco do Cargo: {foco_cargo}\n"
            f"- Nível de Dificuldade: {dificuldade}\n"
            f"- Quantidade: {qtd_questoes}\n\n"
            "Apresente as questões com 5 alternativas (A, B, C, D, E) no estilo clássico da FCC.\n"
            "No final de cada questão, inclua o Gabarito Comentado explicativo."
        )
        
        with st.spinner("Gerando simulado com inteligência artificial..."):
            # Lista de modelos por ordem de preferência para evitar instabilidade
            modelos_disponiveis = [
                "gemini-3.8-flash",
                "gemini-2.5-pro",
                "gemini-flash-latest"
            ]
            
            sucesso = False
            for mod in modelos_disponiveis:
                try:
                    response = client.models.generate_content(
                        model=mod,
                        contents=prompt,
                    )
                    st.markdown("### 📝 Simulado Gerado")
                    st.write(response.text)
                    sucesso = True
                    break
                except APIError as e:
                    # Se for pico de uso, tenta o próximo modelo da lista
                    continue
                except Exception as e:
                    st.error(f"Erro inesperado: {e}")
                    break
            
            if not sucesso:
                st.warning("⚠️ O serviço do Gemini está enfrentando alta demanda momentânea nos servidores da Google. Por favor, aguarde alguns instantes e tente novamente.")
