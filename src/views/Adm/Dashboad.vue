<template>
  <div>
    <v-row>
      <v-col cols="12" md="3" sm="6" order="1" class="align-self-end">
        <statistics-card-with-images
          :avatar="ratingsOptions.avatar"
          :avatar-width="ratingsOptions.avatarWidth"
          :statistics="ratingsOptions.statistics"
          :stat-title="ratingsOptions.statTitle"
        ></statistics-card-with-images>
      </v-col>
      <v-col
        cols="12"
        md="3"
        sm="6"
        order="2"
        class="align-self-end"
      >
        <statistics-card-with-images
          :avatar="sessionsOptions.avatar"
          :avatar-width="sessionsOptions.avatarWidth"
          :statistics="sessionsOptions.statistics"
          :stat-title="sessionsOptions.statTitle"
        ></statistics-card-with-images>
      </v-col>
      <v-col
        cols="12"
        md="6"
        sm="12"
        order="5"
        order-md="3"
      >
        <v-card>
          <v-card-title class="align-start">
            <span class="font-weight-semibold">Estatísticas gerais</span>

            <v-spacer></v-spacer>

            <v-btn
              icon
              small
              class="mt-n2 me-n3"
            >
              <v-icon class="cursor-pointer">
                {{ icons.mdiDotsVertical }}
              </v-icon>
            </v-btn>
          </v-card-title>

          <v-card-subtitle class="mb-7">
            <span class="font-weight-semibold text--primary me-1">Total de atividades no mês</span>
          </v-card-subtitle>

          <v-card-text>
            <v-row>
              <v-col
                v-for="data in statisticsData"
                :key="data.title"
                cols="6"
                sm="3"
                class="d-flex align-center"
              >
                <v-avatar
                  size="44"
                  :color="resolveStatisticsIconVariation (data.type).color"
                  rounded
                  class="elevation-1"
                >
                  <v-icon
                    dark
                    color="white"
                    size="30"
                  >
                    {{ resolveStatisticsIconVariation (data.type).icon }}
                  </v-icon>
                </v-avatar>

                <div class="ms-3">
                  <p class="text-xs mb-0">
                    {{ data.title }}
                  </p>
                  <h3 class="text-xl font-weight-bold">
                    {{ data.total }}
                  </h3>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="6"
        sm="12"
      >
        <v-card>
          <v-card-title class="align-start">
            <span>Visão geral dos planos de manutenções</span>
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <vue-apex-charts
                  id="chart-sales-overview"
                  :options="chartOptions"
                  :series="chartData"
                  class="h-full d-flex align-center"
                ></vue-apex-charts>
              </v-col>

              <v-col
                cols="12"
                sm="6"
                class="d-flex flex-column justify-center"
              >
                <div class="d-flex align-center">
                  <v-avatar
                    class="v-avatar-light-bg primary--text"
                    rounded
                    size="40"
                  >
                    <v-icon
                      size="30"
                      color="primary"
                    >
                      {{ icons.mdiReceiptTextCheckOutline }}
                    </v-icon>
                  </v-avatar>
                  <div class="ms-4 d-flex flex-column">
                    <p class="text--primary mb-0 text-base">
                      Total de planos
                    </p>
                    <span class="text--primary font-weight-semibold text-xl">104</span>
                  </div>
                </div>

                <v-divider class="my-6"></v-divider>

                <table class="sales-overview-stats-table">
                  <tr>
                    <td>
                      <div class="mb-0">
                        <div class="stats-dot primary d-inline-block rounded-circle me-2"></div>
                        <span>PENDENTES</span>
                      </div>
                      <span class="text-base text--primary font-weight-semibold ms-4">12</span>
                    </td>
                    <td>
                      <div class="mb-0">
                        <div class="stats-dot primary d-inline-block rounded-circle me-2"></div>
                        <span>EM ANALISE</span>
                      </div>
                      <span class="text-base text--primary font-weight-semibold ms-4">24</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="mb-0">
                        <div class="stats-dot primary d-inline-block rounded-circle me-2"></div>
                        <span>APROVADOS</span>
                      </div>
                      <span class="text-base text--primary font-weight-semibold ms-4">15</span>
                    </td>
                    <td>
                      <div class="mb-0">
                        <div class="stats-dot secondary d-inline-block rounded-circle me-2"></div>
                        <span>EM PRODUÇÃO</span>
                      </div>
                      <span class="text-base text--primary font-weight-semibold ms-4">50</span>
                    </td>
                  </tr>
                </table>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
        sm="12"
      >
        <v-card>
    <v-card-title class="align-start">
      <div>
        <p class="mb-2">
          Total de atividades semanais
        </p>
        <small class="text--secondary text-base">Total 100 atividades</small>
      </div>
    </v-card-title>
    <v-card-text>
      <!-- Chart -->
      <vue-apex-charts
        height="250"
        :options="chartOptions2"
        :series="chartData2"
      ></vue-apex-charts>

      <!-- Stats -->
      <div class="d-flex justify-space-around flex-wrap mt-5">
        <div class="d-flex align-center">
          <v-avatar
            class="v-avatar-light-bg primary--text"
            rounded
            size="40"
          >
            <v-icon
              size="30"
              color="primary"
            >
              {{ icons.mdiTrendingNeutral }}
            </v-icon>
          </v-avatar>
          <div class="ms-4 d-flex flex-column">
            <p class="text--primary font-weight-semibold text-base mb-0">
              21.8k
            </p>
            <span>Agendadas</span>
          </div>
        </div>

        <div class="d-flex align-center">
          <v-avatar
            class="v-avatar-light-bg success--text"
            rounded
            size="40"
          >
            <v-icon
              size="30"
              color="success"
            >
              {{ icons.mdiTrendingUp }}
            </v-icon>
          </v-avatar>
          <div class="ms-4 d-flex flex-column">
            <p class="text--primary font-weight-semibold text-base mb-0">
              21.8k
            </p>
            <span>CONCLUIDAS</span>
          </div>
        </div>
        <div class="d-flex align-center">
          <v-avatar
            class="v-avatar-light-bg success--text"
            rounded
            size="40"
          >
            <v-icon
              size="30"
              color="error"
            >
              {{ icons.mdiTrendingDown }}
            </v-icon>
          </v-avatar>
          <div class="ms-4 d-flex flex-column">
            <p class="text--primary font-weight-semibold text-base mb-0">
              21.8k
            </p>
            <span>VENCIDAS</span>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>

      </v-col>
    </v-row>
  </div>
</template>
<script>
import store from "@/store";
import { mdiAccountOutline, mdiTrendingUp, mdiTrendingNeutral, mdiTrendingDown, mdiDotsVertical, mdiLabelOutline, mdiCurrencyUsd, mdiReceiptTextCheckOutline } from '@mdi/js'
import StatisticsCardWithImages from "@/components/StatisticsCardWithImages.vue";
import { getVuetify, addAlpha } from '@core/utils'
import {
  onMounted
} from "@vue/composition-api";

export default {
  name: "Dashboard-Administrativo",
  components: {
    StatisticsCardWithImages,
    VueApexCharts: () => import('vue-apexcharts'),
  },
  setup() {
    const $vuetify = getVuetify()

    const ratingsOptions = {
      statTitle: "Total usuários",
      statistics: "400",
      avatar: require("@/assets/images/avatars/9.png"),
      avatarWidth: "111",
    }

    const sessionsOptions = {
      statTitle: 'Total de empresas',
      statistics: '10',
      avatar: require('@/assets/images/avatars/10.png'),
      avatarWidth: '86',
    }

    const statisticsData = [
      {
        title: 'A fazer',
        total: '245k',
        type: 'ativo',
      },
      {
        title: 'Pendentes',
        total: '12.5k',
        type: 'pendente',
      },
      {
        title: 'Concluidas',
        total: '1.54k',
        type: 'concluida',
      },
      {
        title: 'Não feitas',
        total: '1.54k',
        type: 'cancelada',
      },
    ]

    const resolveStatisticsIconVariation = data => {
      if (data === 'ativo') return { icon: mdiTrendingUp, color: 'primary' }
      if (data === 'concluida') return { icon: mdiAccountOutline, color: 'success' }
      if (data === 'pendente') return { icon: mdiLabelOutline, color: 'warning' }
      if (data === 'cancelada') return { icon: mdiLabelOutline, color: 'error' }

      return { icon: mdiAccountOutline, color: 'success' }
    }

    const chartOptions = {
      labels: ['PENDENTES', 'EM ANALISE', 'APROVADOS', 'PRODUÇÃO', 'CANCELADOS'],
      colors: [
        $vuetify.theme.currentTheme.primary,
        addAlpha($vuetify.theme.currentTheme.primary, 0.7),
        addAlpha($vuetify.theme.currentTheme.primary, 0.3),
        addAlpha($vuetify.theme.currentTheme.secondary, 0.1),
      ],
      chart: {
        type: 'donut',
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: {
              show: true,
              name: {
                fontSize: '14px',
                offsetY: 25,
              },
              value: {
                fontSize: '2.125rem',
                fontWeight: 600,

                offsetY: -15,
                formatter(value) {
                  return `${value}`
                },
              },
              total: {
                show: true,
                label: 'Total',
                color: 'rgba(94, 86, 105, 0.68)',
                formatter(value) {
                  return `${value.globals.seriesTotals.reduce((total, num) => total + num)}`
                },
              },
            },
          },
        },
      },
    }

    const chartData = [12, 24, 15, 50, 3]

    const chartOptions2 = {
      colors: [
        addAlpha($vuetify.theme.currentTheme.primary, 0.1),
        addAlpha($vuetify.theme.currentTheme.primary, 0.1),
        addAlpha($vuetify.theme.currentTheme.primary, 0.1),
        addAlpha($vuetify.theme.currentTheme.primary, 0.1),
        $vuetify.theme.currentTheme.primary,
        addAlpha($vuetify.theme.currentTheme.primary, 0.1),
        addAlpha($vuetify.theme.currentTheme.primary, 0.1),
      ],
      chart: {
        type: 'bar',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: '60%',
          distributed: true,
          borderRadius: 4,
          startingShape: 'rounded',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        tickPlacement: 'on',
        labels: {
          style: {
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        show: false,
      },
      grid: {
        show: false,
        padding: {
          top: -20,
          left: -10,
          right: -10,
        },
      },
    }

    const chartData2 = [
      {
        data: [40, 60, 50, 60, 90, 40, 50],
      },
    ]

    onMounted(() => {});

    return {
      ratingsOptions, sessionsOptions, statisticsData,
      resolveStatisticsIconVariation,       
      icons: {
        mdiDotsVertical,
        mdiCurrencyUsd,
        mdiReceiptTextCheckOutline,
        mdiTrendingDown,
        mdiTrendingNeutral,
        mdiTrendingUp

      },
      chartOptions,
      chartData,
      chartOptions2,
      chartData2,
    };
  },
};
</script>

<style lang="scss">
  #chart-sales-overview {
    .apexcharts-canvas {
      .apexcharts-text {
        &.apexcharts-datalabel-value {
          font-weight: 600;
        }
        &.apexcharts-datalabel-label {
          font-size: 1rem;
        }
      }
    }
  }

  .sales-overview-stats-table {
    width: 100%;
    td {
      padding-bottom: 1rem;
    }

    .stats-dot {
      padding: 0.33rem;
    }

    // Set opacity of dots
    tr {
      &:nth-of-type(1) {
        td:nth-of-type(2) {
          .stats-dot {
            opacity: 0.7;
          }
        }
      }
      &:nth-of-type(2) {
        td:nth-of-type(1) {
          .stats-dot {
            opacity: 0.5;
          }
        }
        td:nth-of-type(2) {
          .stats-dot {
            opacity: 0.15;
          }
        }
      }
    }
  }
</style>