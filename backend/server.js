require('dotenv').config({ path: '.env.local' });


const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const cors = require('@koa/cors');

const app = new Koa();
const router = new Router();

app.use(cors({ origin: '*' }));
app.use(bodyParser());

mongoose.connect('mongodb+srv://sbaldeveloper:pGO8EA3j89blSOLj@cluster0.3bjrh.mongodb.net/?retryWrites=true&w=majority', {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

const jobSchema = new mongoose.Schema({
  company: String,
  position: String,
  salaryRange: String,
  status: String,
  notes: String,
});

const Job = mongoose.model('Job', jobSchema);

// Получение списка работ с ограничением и использованием lean для оптимизации памяти
router.get('/api/jobs', async (ctx) => {
  try {
    const jobs = await Job.find().limit(10).lean(); // Ограничиваем количество записей до 10 и облегчаем данные
    ctx.body = jobs;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Failed to fetch jobs', error: error.message };
    console.error('GET /api/jobs error:', error);
  }
});

// Создание новой записи
router.post('/api/jobs', async (ctx) => {
  try {
    const newJob = new Job(ctx.request.body);
    await newJob.save();
    ctx.status = 201;
    ctx.body = newJob;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Failed to create job', error: error.message };
    console.error('POST /api/jobs error:', error);
  }
});

// Обновление записи по ID
router.put('/api/jobs/:id', async (ctx) => {
  try {
    const job = await Job.findByIdAndUpdate(ctx.params.id, ctx.request.body, { new: true }).lean(); // Добавляем lean для оптимизации
    if (!job) {
      ctx.status = 404;
      ctx.body = { message: 'Job not found' };
    } else {
      ctx.body = job;
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Failed to update job', error: error.message };
    console.error('PUT /api/jobs/:id error:', error);
  }
});

// Удаление записи по ID
router.delete('/api/jobs/:id', async (ctx) => {
  try {
    const job = await Job.findByIdAndDelete(ctx.params.id).lean(); // Добавляем lean для оптимизации
    if (!job) {
      ctx.status = 404;
      ctx.body = { message: 'Job not found' };
    } else {
      ctx.body = { message: 'Job deleted' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Failed to delete job', error: error.message };
    console.error('DELETE /api/jobs/:id error:', error);
  }
});

app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));