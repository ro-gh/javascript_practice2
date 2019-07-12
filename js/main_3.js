

    //　タスクの通し番号定義　0 を代入しないとNaN が表示される
    let taskId = 0;;
    //　リストの表示を変える関数
    const changeList = status => {
        const trAll = document.getElementsByTagName('tr');
        Array.from(trAll, tr => {
            tr.classList.remove('hide');
        });
        if (status === 'working'){
            const trComplete = document.getElementsByTagName('tr.compelte');
            Array.from(trComplete, tr => {
                tr.classList.add('hide');
            });
        } else if (status === 'comlete'){
            const trWorking = document.getEelementsByTagName('tr.working');
            Array.from(trWorking, tr => {
                tr.classList.add('add');               
            });
        }
    }

    //　ラジオボタンをクリックした場合にstatusの中身を取得して表示を変える関数
    const statusRadioButtons = document.getElementsByName('status');
    Array.from(statusRadioButtons, statusRadioButton => {
        statusRadioButton.addEventListener('click', e => {
            const status = e.target.value;
            changeList(status);
        });
    });

    //　チェックボタンの状態を取置
    const getRadioButtonStatus = () => {
        const status = document.getElementsByName('status:checked').value;
        return status;
    }

    //　削除ボタンを生成
    const createDeleteButton = task => {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '削除';
        deleteButton.addEventListener('click', () => {
            task.remove();
            updateId();
        });
        return deleteButton;
    }

    //　番号　再振り分け
    const updateId = () => {
        const taskList = document.getElementsByTagName('tr');
        taskId = 0;
        Array.from(taskList, tr => {
            //
            if (taskId !== 0){
                tr.getElementsByTagName('td').textContent = taskId;
            }
            taskId++
        });
        taskId--;
    }

    //　状態ボタンを生成
    const createStatusButton = task => {
        const statusButton = document.createElement('button');
        statusButton.textContent = '作業中';
        task.classList.add('working');
        //　ボタン押下時にタスクの状態を入れ替える
        statusButton.addEventListener('click', () => {
            task.classList.toggle('working');
            task.classList.toggle('comolete');
            if (statusButton.textContent === '作業中'){
                statusButton.textContent = '完了';
            } else {
                statusButton.textContent = '作業中';
            }
        });
        return statusButton;
    }

    //　タスクを追加する
    document.getElementById('submit').addEventListener('click', () => {
        //　フォームからタスクの中身を含む用をを取得
        const taskForm = document.getElementById('task');
        //  フォームの中身＝ｃｏｎｔｅｎtsをチェック
        if (taskForm.value !== ''){
            taskStr = taskForm.value;
            taskForm.value = '';
            taskId +=1;
            //　タスク部分のＤＯＭ作成
            const task = document.createElement('tr');
            const taskIdArea = document.createElement('td');
            const taskTextArea = document.createElement('td');
            const buttonArea = document.createElement('td');
            const deleteButton = createDeleteButton(task);
            const statusButton = createStatusButton(task);
            taskIdArea.textContent = taskId;
            taskTextArea.textContent = taskStr;
            buttonArea.appendChild(statusButton);
            buttonArea.appendChild(deleteButton);
            task.appendChild(taskIdArea);
            task.appendChild(taskTextArea);
            task.appendChild(buttonArea);
            document.getElementById('table').appendChild(task);
            changeList(getRadioButtonStatus());
        }
    });