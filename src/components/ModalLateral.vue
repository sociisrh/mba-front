<template>
  <v-navigation-drawer
    v-model="show" 
    temporary
    touchless
    :right="!$vuetify.rtl"
    :width="$vuetify.breakpoint.smAndUp ? 350 : '100%'"
    app
  >
    <v-card height="100%">
      <div class="drawer-header d-flex align-center mb-4">
        <span class="font-weight-semibold text-base text--primary">{{ title }}</span>
        <v-spacer></v-spacer>
        <v-btn
          icon
          small
          @click="hide"
        >
          <v-icon size="22">
            mdi-close
          </v-icon>
        </v-btn>
      </div>   
      <v-card-text> 
        <slot name="content"></slot>        
        <template v-if="headers && item">
          <v-list-item-content
            v-for="(header, index) in headers"
            :key="index"
            class="pt-0"
          >
            <v-divider v-if="index > 0" class="mb-3" style="border-width: thin 1px 0 0"></v-divider>
            <v-list-item-title class="text-subtitle-2 font-weight-medium mb-2">
              <v-tooltip
                v-if="header.about"
                left
              >
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{header.text}}</span>
                </template>
                <span>{{header.about}}</span>
              </v-tooltip>
              <span v-else>{{header.text}}</span>
            </v-list-item-title>
            <v-list-item-subtitle :class="custumFlex(header.value)" style="white-space: normal; line-height: 23px">
              <slot :name="'item.'+header.value" :item="item">
                {{ getItemValue(header, item) }}
              </slot>
            </v-list-item-subtitle>
          </v-list-item-content>
        </template>
        <slot name="footer"></slot>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: "modal-lateral",
  props: [
    'show',
    'hide',
    'width',
    'title',
    'headers',
    'item',
  ],
  data () {
    return { }
  },
  methods: {
    custumFlex(value) {
      if(value == 'foto') {
        return 'text--primary d-flex justify-center'
      } else {
        return 'text--primary'
      }
    },
    getItemValue(header, item) {
      let explode = header.value.split('.')
      if(Object.keys(item).length > 0) {
        if(explode.length == 0) {
          return item[header.value];
        } else {
          explode.forEach(key => {
            item = item ? item[key] : ''
          });
          return item;
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.theme--light.v-sheet {
    background: #fff !important;
}
@media (max-width:959px){
  .v-navigation-drawer{
    z-index: 7;
    width:320px !important;
  }
  
}
@media (max-width: 599px){
  .v-navigation-drawer{
    width: calc(100% - 30px) !important;
  }
}
</style>
