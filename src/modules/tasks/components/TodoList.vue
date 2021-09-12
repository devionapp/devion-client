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
      <v-subheader class="subheading" v-if="todos.length == 0"
        >Nenhuma tarefa adicionada</v-subheader
      >
      <v-subheader class="subheading" v-else-if="todos.length == 1"
        >Suas tarefas</v-subheader
      >

      <v-list-item-group>
        <v-list-item v-for="(todo, i) in todos" :key="i">
          <template #default="{ active, toggle }">
            <v-list-item-action>
              <v-checkbox
                color="success"
                v-model="todos[i].active"
                @click="toggle"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title
                :class="{
                  done: active
                }"
                >{{ todo.title | capitalize }}</v-list-item-title
              >
            </v-list-item-content>
            <v-btn
              fab
              ripple
              small
              color="error"
              v-if="active"
              @click="removeTodo(i)"
            >
              <v-icon class="white--text">mdi-close</v-icon>
            </v-btn>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </section>
</template>

<script>
export default {
  name: "TodoList",
  data() {
    return {
      isDark: true,
      show: true,
      newTodo: "",
      todos: [],
      day: this.todoDay(),
      date: new Date().getDate(),
      ord: this.nth(new Date().getDate()),
      year: new Date().getFullYear()
    };
  },
  methods: {
    addTodo() {
      const value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }

      this.todos.push({
        title: this.newTodo,
        done: false
      });
      this.newTodo = "";
    },

    removeTodo(index) {
      this.todos.splice(index, 1);
    },

    todoDay() {
      const d = new Date();
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      return days[d.getDay()];
    },

    nth(d) {
      if (d > 3 && d < 21) return "th";
      switch (d % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
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
