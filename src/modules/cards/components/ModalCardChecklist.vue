<template>
  <section class="todo-list">
    <p class="mx-12 text-right">
      <b>{{ todos.length }}</b> Tarefas
    </p>

    <v-text-field
      outlined
      v-model="newTodo"
      id="newTodo"
      name="newTodo"
      label="Insira uma tarefa"
      @keyup.enter="addTodo"
    />

    <v-list subheader two-line flat>
      <v-subheader class="subheading" v-if="todos.length == 0">
        Nenhuma tarefa adicionada
      </v-subheader>

      <v-subheader class="subheading" v-else-if="todos.length == 1">
        Suas tarefas
      </v-subheader>

      <v-list-item-group>
        <v-list-item v-for="(todo, i) in todos" :key="i">
          <template #default="{ active, toggle }">
            <v-list-item-action>
              <v-checkbox
                color="success"
                v-model="todos[i].done"
                @click="handleActive(i, toggle)"
              />
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title
                :class="{
                  done: active
                }"
                >{{ todo.title | capitalize }}</v-list-item-title
              >
            </v-list-item-content>
            <v-btn fab ripple small color="error" @click="removeTodo(i)">
              <v-icon class="white--text">mdi-close</v-icon>
            </v-btn>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </section>
</template>

<script>
import CardChecklist from "../models/CardChecklist";

export default {
  name: "ModalCardChecklist",
  props: {
    cardId: {
      type: Number
    }
  },
  data() {
    return {
      model: new CardChecklist(this.cardId),
      show: true,
      newTodo: "",
      todos: []
    };
  },
  mounted() {
    this.getChecklist();
  },
  methods: {
    async handleActive(index) {
      this.todos[index].done = true;

      await this.model.updateRecordPatch("", this.todos[index]);
    },
    async getChecklist() {
      this.todos = await this.model.getChecklist(this.cardId);
    },
    async addTodo() {
      const value = this.newTodo && this.newTodo.trim();

      if (!value) {
        return;
      }

      await this.model.insertRecord({
        title: this.newTodo,
        done: false
      });

      this.todos.push({
        title: this.newTodo,
        done: false
      });

      this.newTodo = "";
    },

    async removeTodo(index) {
      await this.model.deleteChecklistItem(this.todos[index].id);
      this.todos.splice(index, 1);
    }
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>

<style lang="scss" scoped>
.done {
  text-decoration: line-through;
}
</style>
