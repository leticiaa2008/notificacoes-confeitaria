# 🎂 SweetArt Confeitaria

## Apresentação do Aplicativo

O **SweetArt Confeitaria** é um aplicativo desenvolvido para facilitar a comunicação entre uma confeitaria e seus clientes, por meio de notificações que avisam quando uma encomenda de bolo está pronta para retirada.

A proposta é tornar o atendimento mais organizado, proporcionando praticidade tanto para a confeitaria quanto para seus consumidores.

## 🎯 Objetivo

Demonstrar a implementação de notificações locais em dispositivos móveis, utilizando React e Capacitor, permitindo o envio de alertas imediatos e agendados.

## ✨ Funcionalidades

- **Solicitação de permissão:** solicita autorização para exibir notificações.
- **Notificação imediata:** informa ao cliente que seu bolo está pronto.
- **Agendamento de notificações:** permite programar alertas para um horário futuro.
- **Gerenciamento de notificações:** consulta a quantidade de notificações pendentes.
- **Cancelamento:** permite cancelar notificações agendadas.
- **Simulação no navegador:** permite testar o funcionamento da interface antes da execução no Android.

## 🔔 Exemplo de notificação

**SweetArt Confeitaria 🎂**

Sua encomenda está pronta! Venha retirar seu bolo.

## 🛠️ Tecnologias utilizadas

- React
- JavaScript
- CSS
- Vite
- Capacitor
- Capacitor Local Notifications
- Android Studio
- Gradle

## 📁 Estrutura do projeto

```text
confeitaria/
├── android/
├── src/
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── www/
├── capacitor.config.json
├── index.html
├── package.json
└── vite.config.js
```

## 🚀 Como executar o projeto

### 1. Instalar as dependências

```bash
npm install
```

### 2. Executar no navegador

```bash
npm run dev
```

### 3. Gerar a versão de produção

```bash
npm run build
```

Os arquivos compilados serão gerados na pasta `www`.

### 4. Sincronizar com Android

```bash
npx cap sync android
```

### 5. Abrir no Android Studio

```bash
npx cap open android
```

No Android Studio, aguarde a sincronização do Gradle, conecte um dispositivo ou inicie um emulador e clique em **Run (▶)**.

## 🧪 Como testar

1. Abra o aplicativo.
2. Clique em **Solicitar Permissão Nativa**.
3. Conceda a permissão de notificações.
4. Clique em **Avisar: Bolo Pronto!** para testar o disparo imediato.
5. Informe 5 segundos no campo de agendamento.
6. Clique em **Agendar em N seg**.
7. Aguarde a notificação aparecer.
8. Teste a opção de cancelar os agendamentos.

**Observação:** no navegador, as notificações são simuladas na interface. Para testar notificações realmente nativas, utilize a versão Android.

## 📱 Considerações finais

O SweetArt Confeitaria demonstra a aplicação prática dos recursos de notificações locais no desenvolvimento de aplicativos móveis.

O projeto utiliza uma situação cotidiana de uma confeitaria para demonstrar como a tecnologia pode melhorar a comunicação com os clientes, automatizar avisos e tornar o atendimento mais eficiente.

---

**Projeto acadêmico — SweetArt Confeitaria 🎂**
