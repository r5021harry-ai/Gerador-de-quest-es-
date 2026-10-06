import streamlit as st
from google import genai

# ---------------------------------------------------------
# CONFIGURAÇÃO DA PÁGINA E TEMA ESCURO (SimulaFCC)
# ---------------------------------------------------------
st.set_page_config(
    page_title="SimulaFCC • SEDUC-MA",
    page_icon="🎓",
    layout="wide"
)

st.markdown("""
<style>
    /* Fundo escuro global */
    .stApp {
        background-color: #0b0f19;
        color: #ffffff;
    }
    
    /* Cartões e containers escuros */
    div[data-testid="stMetricValue"] {
        color: #6366f1 !important;
    }
    
    /* Botões personalizados */
    .stButton>button {
        width: 100%;
        border-radius: 8px;
        background-color: #1e293b;
        color: #ffffff;
        border: 1px solid #334155;
        padding: 10px;
        font-weight: bold;
    }
    
    .stButton>button:hover {
        border-color: #6366f1;
        color: #6366f1;
    }

    /* Banner do Plano de Reforço */
    .reforco-card {
        background: linear-gradient(90deg, #4c0519 0%, #1e1b4b 100%);
        border: 1px solid #e11d48;
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 25px;
    }
</style>
""", unsafe_allow_html=True)

# ---------------------------------------------------------
# BARRA SUPERIOR E DE NAVEGAÇÃO
# ---------------------------------------------------------
col_title, col_stats = st.columns([2, 1])

with col_title:
    st.markdown("### 🎓 **SimulaFCC** <span style='background-color: #854d0e; color: #fef08a; padding: 2px 8px; border-radius: 4px; font-size: 12px;'>SEDUC-MA • Ensino Médio</span>", unsafe_allow_html=True)
    st.caption("Magistério Ensino Médio: História & Biologia • Fundação Carlos Chagas")

with col_stats:
    m1, m2, m3 = st.columns(3)
    m1.metric("Respondidas", "5")
    m2.metric("Aproveitamento", "40%")
    m3.metric("Ofensiva", "🔥 1 dia")

st.divider()

# Menu de navegação superior
nav_cols = st.columns(6)
nav_cols[0].button("➕ Novo Simulado", type="primary")
nav_cols[1].button("🔄 Reforço (3)")
nav_cols[2].button("📖 Caderno de Erros")
nav_cols[3].button("📈 Estatísticas")
nav_cols[4].button("📜 Histórico")
nav_cols[5].button("📄 Edital Base")

st.write("")

# ---------------------------------------------------------
# BANNER DE PLANO DE REFORÇO ATIVO
# ---------------------------------------------------------
st.markdown("""
<div class="reforco-card">
    <h4 style="margin: 0; color: #fecdd3;">🎯 Plano de Reforço Ativo: 3 questão(ões) no Caderno de Erros</h4>
    <p style="margin: 5px 0 0 0; color: #fda4af; font-size: 14px;">Aumente sua retenção realizando um simulado focado especificamente nos conteúdos que você mais errou.</p>
</div>
""", unsafe_allow_html=True)

# ---------------------------------------------------------
# PAINEL DE CONFIGURAÇÃO DO SIMULADO
# ---------------------------------------------------------
st.subheader("⚙️ Configurar Simulado FCC • SEDUC-MA")
st.caption("Personalize disciplina, profundidade e modo de treino da banca")

# Chave API na Barra Lateral
api_key = st.sidebar.text_input("Cole sua Gemini API Key:", type="password")

# Área do Cargo
st.write("**Área do Cargo (Ensino Médio):**")
foco_cargo = st.radio(
    "Cargo", 
    ["Geral / Combinado", "Foco: Professor de História", "Foco: Professor de Biologia"],
    horizontal=True,
    label_visibility="collapsed"
)

# 1. Disciplinas
st.write("### 1. DISCIPLINA DO EDITAL")
disc_col1, disc_col2, disc_col3 = st.columns(3)

with disc_col1:
    disc_todas = st.checkbox("Todas as Disciplinas (Simulação Mista)", value=True)
    disc_legis = st.checkbox("Legislação Educacional e do Maranhão")

with disc_col2:
    disc_hist = st.checkbox("História (Ensino Médio)")
    disc_pedag = st.checkbox("Conhecimentos Pedagógicos e Didática")

with disc_col3:
    disc_bio = st.checkbox("Biologia (Ensino Médio)")
    disc_port = st.checkbox("Língua Portuguesa")

# 2. Dificuldade e Quantidade
col_dif, col_qtd = st.columns(2)

with col_dif:
    st.write("### 2. NÍVEL DE DIFICULDADE DA FCC")
    dificuldade = st.select_slider(
        "Dificuldade",
        options=["Todos", "Fácil", "Médio", "Difícil"],
        value="Todos",
        label_visibility="collapsed"
    )

with col_qtd:
    st.write("### 3. QUANTIDADE DE QUESTÕES")
    qtd_questoes = st.select_slider(
        "Quantidade",
        options=["5 questões", "10 questões", "15 questões", "20 questões"],
        value="10 questões",
        label_visibility="collapsed"
    )

st.divider()

# ---------------------------------------------------------
# GERAÇÃO DAS QUESTÕES COM O GEMINI
# ---------------------------------------------------------
if st.button("🚀 GERAR SIMULADO AGORA", type="primary"):
    if not api_key:
        st.error("Por favor, cole a sua Gemini API Key na barra lateral para gerar as questões!")
    else:
        client = genai.Client(api_key=api_key)
        
        prompt = f"""
        Você é uma banca examinadora da FCC (Fundação Carlos Chagas) preparando a prova da SEDUC-MA.
        Crie um simulado com a seguinte configuração:
        - Cargo: {foco_cargo}
        - Dificuldade: {dificuldade}
        - Quantidade: {qtd_questoes}
        
        Forneça as questões de múltipla escolha (A, B, C, D, E) no formato idêntico ao da banca FCC, com gabarito e comentário explicativo detalhado ao final de cada questão.
        """
        
        with st.spinner("A gerar questões com a IA da FCC..."):
            try:
                response = client.models.generate_content(
                    model="gemini-2.5-flash",
                    contents=prompt,
                )
                st.markdown("## 📝 Seu Simulado")
                st.write(response.text)
            except Exception as e:
                st.error(f"Erro ao gerar simulado: {e}")
