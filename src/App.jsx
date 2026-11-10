
import React, { useEffect, useRef, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import './App.css';

export default function App() {
  const [permissao, setPermissao] = useState(false);
  const [modalPermissao, setModalPermissao] = useState(false);
  const [segundos, setSegundos] = useState(5);
  const [status, setStatus] = useState('Aguardando ação...');
  const [pendentes, setPendentes] = useState(0);
  const [notificacao, setNotificacao] = useState(null);

  const timerRef = useRef(null);
  const toastRef = useRef(null);
  const idRef = useRef(1);

  const ambienteNativo = Capacitor.isNativePlatform();

  // Verifica a permissão ao abrir o aplicativo
  useEffect(() => {
    verificarPermissao();

    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(toastRef.current);
    };
  }, []);

  async function verificarPermissao() {
    if (!ambienteNativo) {
      setStatus('Simulador pronto para testar.');
      return;
    }

    try {
      const resultado = await LocalNotifications.checkPermissions();

      setPermissao(resultado.display === 'granted');

      setStatus(
        resultado.display === 'granted'
          ? 'Permissão ativa no dispositivo.'
          : 'Permissão ainda não concedida.'
      );

      atualizarPendentes();
    } catch (error) {
      console.error(error);
      setStatus('Não foi possível verificar as permissões.');
    }
  }

  // Solicita a permissão de notificações
  async function solicitarPermissao() {
    if (!ambienteNativo) {
      setModalPermissao(true);
      return;
    }

    try {
      let resultado = await LocalNotifications.checkPermissions();

      if (resultado.display !== 'granted') {
        resultado = await LocalNotifications.requestPermissions();
      }

      const concedida = resultado.display === 'granted';

      setPermissao(concedida);

      setStatus(
        concedida
          ? 'Permissão concedida com sucesso! 💗'
          : 'Permissão de notificações negada.'
      );
    } catch (error) {
      console.error(error);
      setStatus('Erro ao solicitar permissão.');
    }
  }

  // Confirmação da permissão no simulador web
  function confirmarPermissao(aceitou) {
    setPermissao(aceitou);
    setModalPermissao(false);

    setStatus(
      aceitou
        ? 'Permissão concedida com sucesso! 💗'
        : 'Permissão de notificações negada.'
    );
  }

  // Exibe uma notificação visual no simulador
  function mostrarNotificacao() {
    setNotificacao({
      titulo: 'SweetArt Confeitaria 🎂',
      mensagem: 'Sua encomenda está pronta! Venha retirar seu bolo.',
    });

    clearTimeout(toastRef.current);

    toastRef.current = setTimeout(() => {
      setNotificacao(null);
    }, 6000);
  }

  // Disparo imediato
  async function dispararImediato() {
    if (!permissao) {
      setStatus('Ative a permissão antes de enviar o alerta!');
      return;
    }

    try {
      if (ambienteNativo) {
        await LocalNotifications.schedule({
          notifications: [
            {
              title: 'SweetArt Confeitaria 🎂',
              body: 'Sua encomenda está pronta! Venha retirar seu bolo.',
              id: idRef.current++,
              schedule: { at: new Date(Date.now() + 1000) },
              extra: { tipo: 'encomenda_pronta' },
            },
          ],
        });
      } else {
        mostrarNotificacao();
      }

      setStatus('Alerta de encomenda enviado com sucesso! 💗');
      atualizarPendentes();
    } catch (error) {
      console.error(error);
      setStatus('Erro ao enviar a notificação.');
    }
  }

  // Agendamento futuro
  async function agendarNotificacao() {
    if (!permissao) {
      setStatus('Ative a permissão antes de agendar!');
      return;
    }

    const tempo = Math.max(1, Number(segundos) || 5);
    const id = idRef.current++;

    try {
      const dataAlvo = new Date(Date.now() + tempo * 1000);

      if (ambienteNativo) {
        await LocalNotifications.schedule({
          notifications: [
            {
              title: 'SweetArt Confeitaria 🎂',
              body: 'Sua encomenda está pronta! Venha retirar seu bolo.',
              id,
              schedule: { at: dataAlvo },
              extra: { tipo: 'encomenda_pronta' },
            },
          ],
        });
      } else {
        clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
          mostrarNotificacao();
          setPendentes(0);
          setStatus('Notificação de encomenda disparada! 🎂');
        }, tempo * 1000);
      }

      setPendentes((anterior) => anterior + 1);

      setStatus(
        `Notificação agendada para daqui a ${tempo} segundos!`
      );
    } catch (error) {
      console.error(error);
      setStatus('Erro ao agendar notificação.');
    }
  }

  // Atualiza notificações pendentes no Android
  async function atualizarPendentes() {
    if (!ambienteNativo) return;

    try {
      const resultado = await LocalNotifications.getPending();
      setPendentes(resultado.notifications.length);
    } catch (error) {
      console.error(error);
    }
  }

  // Cancela os agendamentos
  async function cancelarTodas() {
    try {
      if (ambienteNativo) {
        const resultado = await LocalNotifications.getPending();

        if (resultado.notifications.length > 0) {
          await LocalNotifications.cancel({
            notifications: resultado.notifications,
          });
        }

        await atualizarPendentes();
      } else {
        clearTimeout(timerRef.current);
        setPendentes(0);
      }

      setStatus('Agendamentos cancelados.');
    } catch (error) {
      console.error(error);
      setStatus('Erro ao cancelar notificações.');
    }
  }

  return (
    <main className="app">

      {/* Barra superior do celular */}
      <div className="status-bar">
        <span>09:41</span>
        <span className="sinais">5G ▰</span>
      </div>

      {/* Notificação simulada */}
      {notificacao && (
        <div className="notification-toast">
          <div className="toast-icon">🎂</div>
          <div className="toast-content">
            <strong>{notificacao.titulo}</strong>
            <span>{notificacao.mensagem}</span>
            <small>Agora</small>
          </div>
        </div>
      )}

      {/* Conteúdo principal */}
      <section className="conteudo">

        <div className="icone-principal">
          🎂
        </div>

        <h1>SweetArt</h1>

        <p className="subtitulo">
          Confeitaria • Notificações de Encomendas
        </p>

        <div className={`permissao ${permissao ? 'ativa' : 'negada'}`}>
          {permissao ? (
            <>PERMISSÃO CONCEDIDA ✓</>
          ) : (
            <>PERMISSÃO: NEGADA ✕</>
          )}
        </div>

        <div className="acoes">

          <button
            className="botao botao-permissao"
            onClick={solicitarPermissao}
          >
            1. Solicitar Permissão Nativa
          </button>

          <button
            className="botao botao-imediato"
            onClick={dispararImediato}
          >
            2. Avisar: Bolo Pronto! 🎂
          </button>

          <div className="agendamento">

            <input
              type="number"
              min="1"
              value={segundos}
              onChange={(e) => setSegundos(e.target.value)}
            />

            <button
              className="botao botao-agendar"
              onClick={agendarNotificacao}
            >
              3. Agendar em N seg ⏱️
            </button>

          </div>

          <div className="pendentes">
            <span>🔔 Agendadas: <strong>{pendentes}</strong></span>

            <button onClick={cancelarTodas}>
              Cancelar
            </button>
          </div>

        </div>

        <div className="status-mensagem">
          <span className="status-ponto"></span>
          <span>{status}</span>
        </div>

        <p className="rodape">
          SweetArt Confeitaria © 2026
        </p>

      </section>

      {/* Modal de permissão para o navegador */}
      {modalPermissao && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-icone">🔔</div>

            <h2>Permitir notificações?</h2>

            <p>
              A SweetArt deseja enviar avisos quando sua
              encomenda estiver pronta para retirada.
            </p>

            <button
              className="modal-aceitar"
              onClick={() => confirmarPermissao(true)}
            >
              Permitir notificações
            </button>

            <button
              className="modal-negar"
              onClick={() => confirmarPermissao(false)}
            >
              Não permitir
            </button>
          </div>
        </div>
      )}

    </main>
  );
}
